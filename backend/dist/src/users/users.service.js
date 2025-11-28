"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                addresses: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const { passwordHash, ...profile } = user;
        return profile;
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                companyName: dto.companyName,
                siretNumber: dto.siretNumber,
            },
            include: {
                addresses: true,
            },
        });
        const { passwordHash, ...profile } = updated;
        return profile;
    }
    async addAddress(userId, dto) {
        if (dto.isDefault) {
            await this.prisma.address.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            });
        }
        return this.prisma.address.create({
            data: {
                userId,
                street: dto.street,
                complement: dto.complement,
                postalCode: dto.postalCode,
                city: dto.city,
                country: dto.country || 'France',
                isDefault: dto.isDefault || false,
            },
        });
    }
    async updateAddress(userId, addressId, dto) {
        const address = await this.prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Adresse non trouvée');
        }
        if (dto.isDefault) {
            await this.prisma.address.updateMany({
                where: { userId, isDefault: true, id: { not: addressId } },
                data: { isDefault: false },
            });
        }
        return this.prisma.address.update({
            where: { id: addressId },
            data: {
                street: dto.street,
                complement: dto.complement,
                postalCode: dto.postalCode,
                city: dto.city,
                country: dto.country,
                isDefault: dto.isDefault,
            },
        });
    }
    async deleteAddress(userId, addressId) {
        const address = await this.prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Adresse non trouvée');
        }
        await this.prisma.address.delete({ where: { id: addressId } });
        return { message: 'Adresse supprimée' };
    }
    async exportUserData(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                addresses: true,
                dossiers: {
                    include: {
                        vehicle: true,
                        documents: {
                            select: {
                                id: true,
                                type: true,
                                fileName: true,
                                createdAt: true,
                            },
                        },
                    },
                },
                notifications: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const { passwordHash, ...userData } = user;
        return {
            exportDate: new Date().toISOString(),
            userData,
        };
    }
    async deleteAccount(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Mot de passe incorrect');
        }
        const activeDossiers = await this.prisma.dossier.count({
            where: {
                userId,
                status: {
                    in: ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'ANTS_SUBMITTED'],
                },
            },
        });
        if (activeDossiers > 0) {
            throw new common_1.BadRequestException('Vous avez des dossiers en cours de traitement. Veuillez attendre leur finalisation avant de supprimer votre compte.');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                deletedAt: new Date(),
                isActive: false,
                email: `deleted_${userId}@deleted.local`,
                firstName: 'Compte',
                lastName: 'Supprimé',
                phone: null,
            },
        });
        await this.prisma.refreshToken.updateMany({
            where: { userId },
            data: { revokedAt: new Date() },
        });
        return { message: 'Compte supprimé avec succès' };
    }
    async findAll(page = 1, limit = 20, search) {
        const skip = (page - 1) * limit;
        const where = { deletedAt: null };
        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    companyName: true,
                    isActive: true,
                    isEmailVerified: true,
                    createdAt: true,
                    lastLoginAt: true,
                    _count: {
                        select: { dossiers: true },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                addresses: true,
                _count: {
                    select: { dossiers: true, notifications: true },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        const { passwordHash, ...profile } = user;
        return profile;
    }
    async toggleUserStatus(id, isActive) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return this.prisma.user.update({
            where: { id },
            data: { isActive },
            select: {
                id: true,
                email: true,
                isActive: true,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map