import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaxCalculatorService } from './tax-calculator.service';
import { CalculateTaxDto, TaxCalculationResult } from './dto/tax-calculator.dto';

@ApiTags('Tax Calculator')
@Controller('tax-calculator')
export class TaxCalculatorController {
  constructor(private taxCalculatorService: TaxCalculatorService) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Calculer le coût de la carte grise' })
  @ApiResponse({ status: 200, description: 'Calcul effectué', type: TaxCalculationResult })
  async calculateTax(@Body() dto: CalculateTaxDto): Promise<TaxCalculationResult> {
    return this.taxCalculatorService.calculateTax(dto);
  }

  @Get('departments')
  @ApiOperation({ summary: 'Liste des départements avec leurs taux' })
  @ApiResponse({ status: 200, description: 'Liste des départements' })
  async getDepartments() {
    return this.taxCalculatorService.getDepartments();
  }

  @Get('eco-malus')
  @ApiOperation({ summary: 'Barème du malus écologique' })
  @ApiResponse({ status: 200, description: 'Barème du malus' })
  async getEcoMalusThresholds() {
    return this.taxCalculatorService.getEcoMalusThresholds();
  }
}
