import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum FuelType {
  ESSENCE = 'ESSENCE',
  DIESEL = 'DIESEL',
  HYBRIDE = 'HYBRIDE',
  ELECTRIQUE = 'ELECTRIQUE',
  GPL = 'GPL',
  HYDROGENE = 'HYDROGENE',
  AUTRE = 'AUTRE',
}

export enum TransactionType {
  ACHAT_NEUF = 'ACHAT_NEUF',
  ACHAT_OCCASION = 'ACHAT_OCCASION',
  CHANGEMENT_ADRESSE = 'CHANGEMENT_ADRESSE',
  DUPLICATA = 'DUPLICATA',
  CESSION = 'CESSION',
  HERITAGE = 'HERITAGE',
}

export class CalculateTaxDto {
  @ApiProperty({ example: '75', description: 'Code du département' })
  @IsString()
  departmentCode: string;

  @ApiProperty({ example: 7, description: 'Puissance fiscale du véhicule' })
  @IsNumber()
  @Min(1)
  @Max(100)
  fiscalPower: number;

  @ApiProperty({ enum: FuelType })
  @IsEnum(FuelType)
  fuelType: FuelType;

  @ApiPropertyOptional({ example: 120, description: 'Émissions CO2 en g/km' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(500)
  co2Emissions?: number;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiPropertyOptional({ example: false, description: 'Véhicule neuf' })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @ApiPropertyOptional({ example: '2020-01-15', description: 'Date de première immatriculation' })
  @IsOptional()
  @IsString()
  firstRegistrationDate?: string;
}

export class TaxCalculationResult {
  @ApiProperty({ description: 'Taxe régionale' })
  regionalTax: number;

  @ApiProperty({ description: 'Frais de gestion' })
  managementFee: number;

  @ApiProperty({ description: 'Frais d\'acheminement' })
  deliveryFee: number;

  @ApiProperty({ description: 'Malus écologique' })
  ecoMalus: number;

  @ApiProperty({ description: 'Montant total' })
  totalAmount: number;

  @ApiProperty({ description: 'Détails du calcul' })
  details: {
    departmentName: string;
    ratePerHp: number;
    exonerationApplied: boolean;
    exonerationRate?: number;
    vehicleAge?: number;
    ageReduction?: number;
  };
}
