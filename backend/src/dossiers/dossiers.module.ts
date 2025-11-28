import { Module } from '@nestjs/common';
import { DossiersService } from './dossiers.service';
import { DossiersController } from './dossiers.controller';
import { TaxCalculatorModule } from '../tax-calculator/tax-calculator.module';

@Module({
  imports: [TaxCalculatorModule],
  controllers: [DossiersController],
  providers: [DossiersService],
  exports: [DossiersService],
})
export class DossiersModule {}
