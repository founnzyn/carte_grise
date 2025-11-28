import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DossiersService } from './dossiers.service';
import { ImportType } from '@prisma/client';

interface CreateDossierBodyDto {
  userId: string; // TODO: remplacer par JWT auth
  region: string;
  marque: string;
  modele: string;
  vin?: string;
  puissanceFiscale: number;
  co2: number;
  origine: string;
  importType: ImportType;
}

@Controller('dossiers')
export class DossiersController {
  constructor(private readonly dossiersService: DossiersService) {}

  @Post()
  async create(@Body() body: CreateDossierBodyDto) {
    return this.dossiersService.create({
      userId: body.userId,
      region: body.region,
      vehicule: {
        marque: body.marque,
        modele: body.modele,
        vin: body.vin,
        puissanceFiscale: body.puissanceFiscale,
        co2: body.co2,
        origine: body.origine,
        importType: body.importType
      }
    });
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.dossiersService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dossiersService.findOne(id);
  }
}
