"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DossiersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tax_calculator_service_1 = require("../tax-calculator/tax-calculator.service");
const dossiers_dto_1 = require("./dto/dossiers.dto");
const uuid_1 = require("uuid");
let DossiersService = class DossiersService {
    prisma;
    taxCalculatorService;
    constructor(prisma, taxCalculatorService) {
        this.prisma = prisma;
        this.taxCalculatorService = taxCalculatorService;
    }
    generateReference() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `CG-${year}${month}-${random}`;
    }
    async create(userId, dto) {
        const { transactionType, vehicle, owner, departmentCode } = dto;
        const taxCalculation = await this.taxCalculatorService.calculateTax({
            departmentCode,
            fiscalPower: vehicle.fiscalPower,
            fuelType: vehicle.fuelType,
            co2Emissions: vehicle.co2Emissions,
            transactionType,
            isNew: vehicle.isNew,
            firstRegistrationDate: vehicle.firstRegistrationDate,
        });
        const createdVehicle = await this.prisma.vehicle.create({
            data: {
                registrationNumber: vehicle.registrationNumber,
                vin: vehicle.vin,
                brand: vehicle.brand,
                model: vehicle.model,
                version: vehicle.version,
                firstRegistrationDate: vehicle.firstRegistrationDate
                    ? new Date(vehicle.firstRegistrationDate)
                    : null,
                purchaseDate: vehicle.purchaseDate
                    ? new Date(vehicle.purchaseDate)
                    : null,
                fiscalPower: vehicle.fiscalPower,
                co2Emissions: vehicle.co2Emissions,
                fuelType: vehicle.fuelType,
                mileage: vehicle.mileage,
                isNew: vehicle.isNew || false,
            },
        });
        const dossier = await this.prisma.dossier.create({
            data: {
                reference: this.generateReference(),
                userId,
                vehicleId: createdVehicle.id,
                transactionType,
                status: 'DRAFT',
                ownerFirstName: owner.firstName,
                ownerLastName: owner.lastName,
                ownerBirthDate: owner.birthDate ? new Date(owner.birthDate) : null,
                ownerBirthPlace: owner.birthPlace,
                ownerAddress: owner.address,
                ownerPostalCode: owner.postalCode,
                ownerCity: owner.city,
                regionalTax: taxCalculation.regionalTax,
                managementFee: taxCalculation.managementFee,
                deliveryFee: taxCalculation.deliveryFee,
                ecoMalus: taxCalculation.ecoMalus,
                totalAmount: taxCalculation.totalAmount,
            },
            include: {
                vehicle: true,
                documents: true,
            },
        });
        await this.prisma.dossierStatusHistory.create({
            data: {
                dossierId: dossier.id,
                status: 'DRAFT',
                comment: 'Dossier créé',
            },
        });
        return dossier;
    }
    async findAll(userId, userRole, filters) {
        const { status, transactionType, search, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (userRole === 'CLIENT') {
            where.userId = userId;
        }
        if (status) {
            where.status = status;
        }
        if (transactionType) {
            where.transactionType = transactionType;
        }
        if (search) {
            where.OR = [
                { reference: { contains: search, mode: 'insensitive' } },
                { ownerFirstName: { contains: search, mode: 'insensitive' } },
                { ownerLastName: { contains: search, mode: 'insensitive' } },
                { vehicle: { brand: { contains: search, mode: 'insensitive' } } },
                { vehicle: { model: { contains: search, mode: 'insensitive' } } },
                { vehicle: { registrationNumber: { contains: search, mode: 'insensitive' } } },
            ];
        }
        const [dossiers, total] = await Promise.all([
            this.prisma.dossier.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    vehicle: true,
                    documents: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            }),
            this.prisma.dossier.count({ where }),
        ]);
        return {
            data: dossiers,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, userId, userRole) {
        const dossier = await this.prisma.dossier.findUnique({
            where: { id },
            include: {
                vehicle: true,
                documents: true,
                statusHistory: {
                    orderBy: { createdAt: 'desc' },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                    },
                },
            },
        });
        if (!dossier) {
            throw new common_1.NotFoundException('Dossier non trouvé');
        }
        if (userRole === 'CLIENT' && dossier.userId !== userId) {
            throw new common_1.ForbiddenException('Accès non autorisé à ce dossier');
        }
        return dossier;
    }
    async update(id, userId, userRole, dto) {
        const dossier = await this.findOne(id, userId, userRole);
        if (dossier.status !== dossiers_dto_1.DossierStatus.DRAFT &&
            dossier.status !== dossiers_dto_1.DossierStatus.DOCUMENTS_PENDING) {
            throw new common_1.BadRequestException('Ce dossier ne peut plus être modifié dans son état actuel');
        }
        const updateData = {};
        if (dto.owner) {
            if (dto.owner.firstName)
                updateData.ownerFirstName = dto.owner.firstName;
            if (dto.owner.lastName)
                updateData.ownerLastName = dto.owner.lastName;
            if (dto.owner.birthDate)
                updateData.ownerBirthDate = new Date(dto.owner.birthDate);
            if (dto.owner.birthPlace)
                updateData.ownerBirthPlace = dto.owner.birthPlace;
            if (dto.owner.address)
                updateData.ownerAddress = dto.owner.address;
            if (dto.owner.postalCode)
                updateData.ownerPostalCode = dto.owner.postalCode;
            if (dto.owner.city)
                updateData.ownerCity = dto.owner.city;
        }
        if (dto.internalNotes && (userRole === 'ADMIN' || userRole === 'PROFESSIONAL')) {
            updateData.internalNotes = dto.internalNotes;
        }
        if (dto.vehicle) {
            await this.prisma.vehicle.update({
                where: { id: dossier.vehicleId },
                data: {
                    registrationNumber: dto.vehicle.registrationNumber,
                    vin: dto.vehicle.vin,
                    brand: dto.vehicle.brand,
                    model: dto.vehicle.model,
                    version: dto.vehicle.version,
                    firstRegistrationDate: dto.vehicle.firstRegistrationDate
                        ? new Date(dto.vehicle.firstRegistrationDate)
                        : undefined,
                    purchaseDate: dto.vehicle.purchaseDate
                        ? new Date(dto.vehicle.purchaseDate)
                        : undefined,
                    fiscalPower: dto.vehicle.fiscalPower,
                    co2Emissions: dto.vehicle.co2Emissions,
                    fuelType: dto.vehicle.fuelType,
                    mileage: dto.vehicle.mileage,
                    isNew: dto.vehicle.isNew,
                },
            });
        }
        return this.prisma.dossier.update({
            where: { id },
            data: updateData,
            include: {
                vehicle: true,
                documents: true,
            },
        });
    }
    async updateStatus(id, userId, userRole, dto) {
        if (userRole === 'CLIENT') {
            throw new common_1.ForbiddenException('Seuls les administrateurs peuvent changer le statut');
        }
        const dossier = await this.findOne(id, userId, userRole);
        const updateData = { status: dto.status };
        if (dto.rejectionReason) {
            updateData.rejectionReason = dto.rejectionReason;
        }
        const updated = await this.prisma.dossier.update({
            where: { id },
            data: updateData,
            include: {
                vehicle: true,
                documents: true,
            },
        });
        await this.prisma.dossierStatusHistory.create({
            data: {
                dossierId: id,
                status: dto.status,
                comment: dto.comment,
                changedBy: userId,
            },
        });
        await this.prisma.notification.create({
            data: {
                userId: dossier.userId,
                title: 'Mise à jour de votre dossier',
                message: `Le statut de votre dossier ${dossier.reference} a été mis à jour: ${this.getStatusLabel(dto.status)}`,
                type: 'STATUS_UPDATE',
                metadata: {
                    dossierId: id,
                    reference: dossier.reference,
                    newStatus: dto.status,
                },
            },
        });
        return updated;
    }
    async submitDossier(id, userId) {
        const dossier = await this.findOne(id, userId, 'CLIENT');
        if (dossier.status !== dossiers_dto_1.DossierStatus.DRAFT) {
            throw new common_1.BadRequestException('Ce dossier a déjà été soumis');
        }
        const requiredDocTypes = ['identite', 'justificatif_domicile', 'certificat_cession'];
        const uploadedDocTypes = dossier.documents.map((d) => d.type);
        const missingDocs = requiredDocTypes.filter((t) => !uploadedDocTypes.includes(t));
        if (missingDocs.length > 0) {
            throw new common_1.BadRequestException(`Documents manquants: ${missingDocs.join(', ')}`);
        }
        return this.prisma.dossier.update({
            where: { id },
            data: { status: 'SUBMITTED' },
            include: {
                vehicle: true,
                documents: true,
            },
        });
    }
    async submitToAnts(id, userId, userRole, antsReference) {
        if (userRole === 'CLIENT') {
            throw new common_1.ForbiddenException('Seuls les professionnels peuvent soumettre à l\'ANTS');
        }
        const dossier = await this.findOne(id, userId, userRole);
        if (dossier.status !== dossiers_dto_1.DossierStatus.APPROVED) {
            throw new common_1.BadRequestException('Le dossier doit être approuvé avant d\'être soumis à l\'ANTS');
        }
        return this.prisma.dossier.update({
            where: { id },
            data: {
                status: 'ANTS_SUBMITTED',
                antsReference: antsReference || `ANTS-${(0, uuid_1.v4)().slice(0, 8).toUpperCase()}`,
                antsSubmittedAt: new Date(),
                antsStatus: 'PENDING',
            },
            include: {
                vehicle: true,
                documents: true,
            },
        });
    }
    async delete(id, userId, userRole) {
        const dossier = await this.findOne(id, userId, userRole);
        if (dossier.status !== dossiers_dto_1.DossierStatus.DRAFT) {
            throw new common_1.BadRequestException('Seuls les dossiers en brouillon peuvent être supprimés');
        }
        await this.prisma.$transaction([
            this.prisma.dossierStatusHistory.deleteMany({ where: { dossierId: id } }),
            this.prisma.document.deleteMany({ where: { dossierId: id } }),
            this.prisma.dossier.delete({ where: { id } }),
            this.prisma.vehicle.delete({ where: { id: dossier.vehicleId } }),
        ]);
        return { message: 'Dossier supprimé avec succès' };
    }
    getStatusLabel(status) {
        const labels = {
            [dossiers_dto_1.DossierStatus.DRAFT]: 'Brouillon',
            [dossiers_dto_1.DossierStatus.SUBMITTED]: 'Soumis',
            [dossiers_dto_1.DossierStatus.DOCUMENTS_PENDING]: 'Documents en attente',
            [dossiers_dto_1.DossierStatus.UNDER_REVIEW]: 'En cours de vérification',
            [dossiers_dto_1.DossierStatus.APPROVED]: 'Approuvé',
            [dossiers_dto_1.DossierStatus.REJECTED]: 'Refusé',
            [dossiers_dto_1.DossierStatus.ANTS_SUBMITTED]: 'Soumis à l\'ANTS',
            [dossiers_dto_1.DossierStatus.COMPLETED]: 'Terminé',
        };
        return labels[status] || status;
    }
};
exports.DossiersService = DossiersService;
exports.DossiersService = DossiersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tax_calculator_service_1.TaxCalculatorService])
], DossiersService);
//# sourceMappingURL=dossiers.service.js.map