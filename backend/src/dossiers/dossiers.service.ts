import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DossierStatus, ImportType } from '@prisma/client';

interface CreateDossierDto {
  userId: string;
  region: string;
  vehicule: {
    marque: string;
    modele: string;
    vin?: string;
    puissanceFiscale: number;
    co2: number;
    origine: string;
    importType: ImportType;
  };
}

@Injectable()
export class DossiersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDossierDto) {
    const reference = `CG-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const dossier = await this.prisma.dossier.create({
      data: {
        reference,
        userId: dto.userId,
        region: dto.region,
        statut: DossierStatus.NOUVEAU,
        vehicule: {
          create: dto.vehicule
        },
        evenements: {
          create: {
            type: 'CREATION',
            payloadJson: { message: 'Dossier créé' },
            auteurId: dto.userId
          }
        }
      },
      include: {
        vehicule: true,
        user: { select: { id: true, email: true, nom: true } }
      }
    });

    return dossier;
  }

  async findByUser(userId: string) {
    return this.prisma.dossier.findMany({
      where: { userId },
      include: {
        vehicule: true,
        documents: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.dossier.findUnique({
      where: { id },
      include: {
        vehicule: true,
        documents: true,
        evenements: { orderBy: { horodatage: 'desc' } },
        paiements: true
      }
    });
  }
}
