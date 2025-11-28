import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDateString,
  ValidateNested,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DossierStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  DOCUMENTS_PENDING = 'DOCUMENTS_PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ANTS_SUBMITTED = 'ANTS_SUBMITTED',
  COMPLETED = 'COMPLETED',
}

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

export class VehicleDto {
  @ApiPropertyOptional({ example: 'AB-123-CD' })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiPropertyOptional({ example: 'VF1RFA00000000000' })
  @IsOptional()
  @IsString()
  vin?: string;

  @ApiProperty({ example: 'Renault' })
  @IsString()
  @MinLength(1)
  brand: string;

  @ApiProperty({ example: 'Clio' })
  @IsString()
  @MinLength(1)
  model: string;

  @ApiPropertyOptional({ example: '1.5 dCi 90' })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiPropertyOptional({ example: '2020-01-15' })
  @IsOptional()
  @IsDateString()
  firstRegistrationDate?: string;

  @ApiPropertyOptional({ example: '2023-06-01' })
  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(100)
  fiscalPower: number;

  @ApiPropertyOptional({ example: 120 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(500)
  co2Emissions?: number;

  @ApiProperty({ enum: FuelType })
  @IsEnum(FuelType)
  fuelType: FuelType;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;
}

export class OwnerDto {
  @ApiProperty({ example: 'Jean' })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiPropertyOptional({ example: '1980-05-15' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({ example: 'Paris' })
  @IsOptional()
  @IsString()
  birthPlace?: string;

  @ApiProperty({ example: '12 rue de la Paix' })
  @IsString()
  @MinLength(5)
  address: string;

  @ApiProperty({ example: '75001' })
  @IsString()
  @MinLength(5)
  postalCode: string;

  @ApiProperty({ example: 'Paris' })
  @IsString()
  @MinLength(2)
  city: string;
}

export class CreateDossierDto {
  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({ type: VehicleDto })
  @ValidateNested()
  @Type(() => VehicleDto)
  vehicle: VehicleDto;

  @ApiProperty({ type: OwnerDto })
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;

  @ApiProperty({ example: '75', description: 'Code département' })
  @IsString()
  departmentCode: string;
}

export class UpdateDossierDto {
  @ApiPropertyOptional({ enum: DossierStatus })
  @IsOptional()
  @IsEnum(DossierStatus)
  status?: DossierStatus;

  @ApiPropertyOptional({ type: VehicleDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleDto)
  vehicle?: Partial<VehicleDto>;

  @ApiPropertyOptional({ type: OwnerDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OwnerDto)
  owner?: Partial<OwnerDto>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  internalNotes?: string;
}

export class UpdateDossierStatusDto {
  @ApiProperty({ enum: DossierStatus })
  @IsEnum(DossierStatus)
  status: DossierStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}

export class SubmitToAntsDto {
  @ApiProperty()
  @IsString()
  dossierId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  antsReference?: string;
}

export class DossierFilterDto {
  @ApiPropertyOptional({ enum: DossierStatus })
  @IsOptional()
  @IsEnum(DossierStatus)
  status?: DossierStatus;

  @ApiPropertyOptional({ enum: TransactionType })
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limit?: number;
}
