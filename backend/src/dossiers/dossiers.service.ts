import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaxCalculatorService } from '../tax-calculator/tax-calculator.service';
import {
  CreateDossierDto,
  UpdateDossierDto,
  UpdateDossierStatusDto,
  DossierFilterDto,
  DossierStatus,
} from './dto/dossiers.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DossiersService {
  constructor(
    private prisma: PrismaService,
    private taxCalculatorService: TaxCalculatorService,
  ) {}

  private generateReference(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CG-${year}${month}-${random}`;
  }

  async create(userId: string, dto: CreateDossierDto) {
    const { transactionType, vehicle, owner, departmentCode } = dto;

    // Calculate taxes
    const taxCalculation = await this.taxCalculatorService.calculateTax({
      departmentCode,
      fiscalPower: vehicle.fiscalPower,
      fuelType: vehicle.fuelType,
      co2Emissions: vehicle.co2Emissions,
      transactionType,
      isNew: vehicle.isNew,
      firstRegistrationDate: vehicle.firstRegistrationDate,
    });

    // Create vehicle
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

    // Create dossier
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

    // Create initial status history
    await this.prisma.dossierStatusHistory.create({
      data: {
        dossierId: dossier.id,
        status: 'DRAFT',
        comment: 'Dossier créé',
      },
    });

    return dossier;
  }

  async findAll(userId: string, userRole: string, filters: DossierFilterDto) {
    const { status, transactionType, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    // Regular users can only see their own dossiers
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

  async findOne(id: string, userId: string, userRole: string) {
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
      throw new NotFoundException('Dossier non trouvé');
    }

    // Check access
    if (userRole === 'CLIENT' && dossier.userId !== userId) {
      throw new ForbiddenException('Accès non autorisé à ce dossier');
    }

    return dossier;
  }

  async update(id: string, userId: string, userRole: string, dto: UpdateDossierDto) {
    const dossier = await this.findOne(id, userId, userRole);

    // Check if dossier can be updated
    if (
      dossier.status !== DossierStatus.DRAFT &&
      dossier.status !== DossierStatus.DOCUMENTS_PENDING
    ) {
      throw new BadRequestException(
        'Ce dossier ne peut plus être modifié dans son état actuel',
      );
    }

    const updateData: Record<string, unknown> = {};

    if (dto.owner) {
      if (dto.owner.firstName) updateData.ownerFirstName = dto.owner.firstName;
      if (dto.owner.lastName) updateData.ownerLastName = dto.owner.lastName;
      if (dto.owner.birthDate)
        updateData.ownerBirthDate = new Date(dto.owner.birthDate);
      if (dto.owner.birthPlace) updateData.ownerBirthPlace = dto.owner.birthPlace;
      if (dto.owner.address) updateData.ownerAddress = dto.owner.address;
      if (dto.owner.postalCode) updateData.ownerPostalCode = dto.owner.postalCode;
      if (dto.owner.city) updateData.ownerCity = dto.owner.city;
    }

    if (dto.internalNotes && (userRole === 'ADMIN' || userRole === 'PROFESSIONAL')) {
      updateData.internalNotes = dto.internalNotes;
    }

    // Update vehicle if provided
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

  async updateStatus(
    id: string,
    userId: string,
    userRole: string,
    dto: UpdateDossierStatusDto,
  ) {
    if (userRole === 'CLIENT') {
      throw new ForbiddenException(
        'Seuls les administrateurs peuvent changer le statut',
      );
    }

    const dossier = await this.findOne(id, userId, userRole);

    const updateData: Record<string, unknown> = { status: dto.status };

    if (dto.rejectionReason) {
      updateData.rejectionReason = dto.rejectionReason;
    }

    // Update dossier
    const updated = await this.prisma.dossier.update({
      where: { id },
      data: updateData,
      include: {
        vehicle: true,
        documents: true,
      },
    });

    // Create status history
    await this.prisma.dossierStatusHistory.create({
      data: {
        dossierId: id,
        status: dto.status,
        comment: dto.comment,
        changedBy: userId,
      },
    });

    // Create notification for user
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

  async submitDossier(id: string, userId: string) {
    const dossier = await this.findOne(id, userId, 'CLIENT');

    if (dossier.status !== DossierStatus.DRAFT) {
      throw new BadRequestException('Ce dossier a déjà été soumis');
    }

    // Check if required documents are uploaded
    const requiredDocTypes = ['identite', 'justificatif_domicile', 'certificat_cession'];
    const uploadedDocTypes = dossier.documents.map((d) => d.type);
    const missingDocs = requiredDocTypes.filter((t) => !uploadedDocTypes.includes(t));

    if (missingDocs.length > 0) {
      throw new BadRequestException(
        `Documents manquants: ${missingDocs.join(', ')}`,
      );
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

  async submitToAnts(id: string, userId: string, userRole: string, antsReference?: string) {
    if (userRole === 'CLIENT') {
      throw new ForbiddenException('Seuls les professionnels peuvent soumettre à l\'ANTS');
    }

    const dossier = await this.findOne(id, userId, userRole);

    if (dossier.status !== DossierStatus.APPROVED) {
      throw new BadRequestException('Le dossier doit être approuvé avant d\'être soumis à l\'ANTS');
    }

    return this.prisma.dossier.update({
      where: { id },
      data: {
        status: 'ANTS_SUBMITTED',
        antsReference: antsReference || `ANTS-${uuidv4().slice(0, 8).toUpperCase()}`,
        antsSubmittedAt: new Date(),
        antsStatus: 'PENDING',
      },
      include: {
        vehicle: true,
        documents: true,
      },
    });
  }

  async delete(id: string, userId: string, userRole: string) {
    const dossier = await this.findOne(id, userId, userRole);

    if (dossier.status !== DossierStatus.DRAFT) {
      throw new BadRequestException(
        'Seuls les dossiers en brouillon peuvent être supprimés',
      );
    }

    // Delete dossier and related data
    await this.prisma.$transaction([
      this.prisma.dossierStatusHistory.deleteMany({ where: { dossierId: id } }),
      this.prisma.document.deleteMany({ where: { dossierId: id } }),
      this.prisma.dossier.delete({ where: { id } }),
      this.prisma.vehicle.delete({ where: { id: dossier.vehicleId } }),
    ]);

    return { message: 'Dossier supprimé avec succès' };
  }

  private getStatusLabel(status: DossierStatus): string {
    const labels: Record<DossierStatus, string> = {
      [DossierStatus.DRAFT]: 'Brouillon',
      [DossierStatus.SUBMITTED]: 'Soumis',
      [DossierStatus.DOCUMENTS_PENDING]: 'Documents en attente',
      [DossierStatus.UNDER_REVIEW]: 'En cours de vérification',
      [DossierStatus.APPROVED]: 'Approuvé',
      [DossierStatus.REJECTED]: 'Refusé',
      [DossierStatus.ANTS_SUBMITTED]: 'Soumis à l\'ANTS',
      [DossierStatus.COMPLETED]: 'Terminé',
    };
    return labels[status] || status;
  }
}
