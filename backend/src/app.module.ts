import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DossiersModule } from './dossiers/dossiers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TaxCalculatorModule } from './tax-calculator/tax-calculator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DossiersModule,
    NotificationsModule,
    TaxCalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
