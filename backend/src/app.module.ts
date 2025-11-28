import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { PrismaService } from './prisma.service';
import { DossiersModule } from './dossiers/dossiers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DossiersModule, AuthModule],
  controllers: [HealthController, SimulatorController],
  providers: [SimulatorService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
