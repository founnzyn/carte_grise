import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('cleanDatabase is not allowed in production');
    }
    // For testing purposes only - delete in reverse order of dependencies
    await this.dossierStatusHistory.deleteMany();
    await this.document.deleteMany();
    await this.notification.deleteMany();
    await this.refreshToken.deleteMany();
    await this.dossier.deleteMany();
    await this.vehicle.deleteMany();
    await this.address.deleteMany();
    await this.user.deleteMany();
    await this.ecoMalusThreshold.deleteMany();
    await this.regionalTaxRate.deleteMany();
  }
}
