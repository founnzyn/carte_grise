import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, AddAddressDto, DeleteAccountDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Remove sensitive data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...profile } = user;
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...profile } = updated;
    return profile;
  }

  async addAddress(userId: string, dto: AddAddressDto) {
    // If this is default address, unset other default addresses
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

  async updateAddress(userId: string, addressId: string, dto: AddAddressDto) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!address) {
      throw new NotFoundException('Adresse non trouvée');
    }

    // If setting as default, unset other default addresses
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

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!address) {
      throw new NotFoundException('Adresse non trouvée');
    }

    await this.prisma.address.delete({ where: { id: addressId } });
    return { message: 'Adresse supprimée' };
  }

  // RGPD - Export user data
  async exportUserData(userId: string) {
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
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Remove sensitive data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userData } = user;

    return {
      exportDate: new Date().toISOString(),
      userData,
    };
  }

  // RGPD - Delete account
  async deleteAccount(userId: string, dto: DeleteAccountDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // Check for active dossiers
    const activeDossiers = await this.prisma.dossier.count({
      where: {
        userId,
        status: {
          in: ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'ANTS_SUBMITTED'],
        },
      },
    });

    if (activeDossiers > 0) {
      throw new BadRequestException(
        'Vous avez des dossiers en cours de traitement. Veuillez attendre leur finalisation avant de supprimer votre compte.',
      );
    }

    // Soft delete - mark as deleted but keep for legal requirements
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

    // Revoke all tokens
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { revokedAt: new Date() },
    });

    return { message: 'Compte supprimé avec succès' };
  }

  // Admin - List all users
  async findAll(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { deletedAt: null };

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

  // Admin - Get user by id
  async findOne(id: string) {
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
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...profile } = user;
    return profile;
  }

  // Admin - Toggle user status
  async toggleUserStatus(id: string, isActive: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
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
}
