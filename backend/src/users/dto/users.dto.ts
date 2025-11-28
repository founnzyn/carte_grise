import { IsString, IsOptional, IsEmail, Matches, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Jean' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Dupont' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;

  @ApiPropertyOptional({ example: '+33612345678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Garage Dupont SARL' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ example: '12345678901234' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{14}$/, { message: 'Le numéro SIRET doit contenir exactement 14 chiffres' })
  siretNumber?: string;
}

export class AddAddressDto {
  @ApiPropertyOptional({ example: '12 rue de la Paix' })
  @IsString()
  @MinLength(5)
  street: string;

  @ApiPropertyOptional({ example: 'Appartement 3' })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiPropertyOptional({ example: '75001' })
  @IsString()
  @MinLength(5)
  postalCode: string;

  @ApiPropertyOptional({ example: 'Paris' })
  @IsString()
  @MinLength(2)
  city: string;

  @ApiPropertyOptional({ example: 'France' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isDefault?: boolean;
}

export class RgpdExportRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class DeleteAccountDto {
  @ApiPropertyOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}
