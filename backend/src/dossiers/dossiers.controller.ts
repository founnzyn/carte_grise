import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DossiersService } from './dossiers.service';
import {
  CreateDossierDto,
  UpdateDossierDto,
  UpdateDossierStatusDto,
  DossierFilterDto,
  SubmitToAntsDto,
} from './dto/dossiers.dto';

interface AuthenticatedRequest {
  user: {
    id: string;
    role: string;
  };
}

@ApiTags('Dossiers')
@Controller('dossiers')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DossiersController {
  constructor(private dossiersService: DossiersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau dossier de carte grise' })
  @ApiResponse({ status: 201, description: 'Dossier créé avec succès' })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateDossierDto,
  ) {
    return this.dossiersService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des dossiers' })
  @ApiResponse({ status: 200, description: 'Liste des dossiers' })
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query() filters: DossierFilterDto,
  ) {
    return this.dossiersService.findAll(req.user.id, req.user.role, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un dossier' })
  @ApiResponse({ status: 200, description: 'Détails du dossier' })
  @ApiResponse({ status: 404, description: 'Dossier non trouvé' })
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.dossiersService.findOne(id, req.user.id, req.user.role);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier un dossier' })
  @ApiResponse({ status: 200, description: 'Dossier modifié' })
  @ApiResponse({ status: 400, description: 'Modification non autorisée' })
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateDossierDto,
  ) {
    return this.dossiersService.update(id, req.user.id, req.user.role, dto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Changer le statut d\'un dossier (Admin/Pro)' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour' })
  async updateStatus(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateDossierStatusDto,
  ) {
    return this.dossiersService.updateStatus(
      id,
      req.user.id,
      req.user.role,
      dto,
    );
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Soumettre un dossier' })
  @ApiResponse({ status: 200, description: 'Dossier soumis' })
  async submitDossier(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.dossiersService.submitDossier(id, req.user.id);
  }

  @Post(':id/ants')
  @ApiOperation({ summary: 'Soumettre à l\'ANTS (workflow interne)' })
  @ApiResponse({ status: 200, description: 'Dossier soumis à l\'ANTS' })
  async submitToAnts(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: SubmitToAntsDto,
  ) {
    return this.dossiersService.submitToAnts(
      id,
      req.user.id,
      req.user.role,
      dto.antsReference,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un dossier (brouillon uniquement)' })
  @ApiResponse({ status: 200, description: 'Dossier supprimé' })
  async delete(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.dossiersService.delete(id, req.user.id, req.user.role);
  }
}
