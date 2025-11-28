import {
  Controller,
  Get,
  Put,
  Post,
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
import { UsersService } from './users.service';
import { UpdateProfileDto, AddAddressDto, DeleteAccountDto } from './dto/users.dto';

interface AuthenticatedRequest {
  user: {
    id: string;
    role: string;
  };
}

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Obtenir son profil' })
  @ApiResponse({ status: 200, description: 'Profil utilisateur' })
  async getProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Mettre à jour son profil' })
  @ApiResponse({ status: 200, description: 'Profil mis à jour' })
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'Ajouter une adresse' })
  @ApiResponse({ status: 201, description: 'Adresse ajoutée' })
  async addAddress(
    @Request() req: AuthenticatedRequest,
    @Body() dto: AddAddressDto,
  ) {
    return this.usersService.addAddress(req.user.id, dto);
  }

  @Put('addresses/:id')
  @ApiOperation({ summary: 'Modifier une adresse' })
  @ApiResponse({ status: 200, description: 'Adresse modifiée' })
  async updateAddress(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: AddAddressDto,
  ) {
    return this.usersService.updateAddress(req.user.id, id, dto);
  }

  @Delete('addresses/:id')
  @ApiOperation({ summary: 'Supprimer une adresse' })
  @ApiResponse({ status: 200, description: 'Adresse supprimée' })
  async deleteAddress(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.usersService.deleteAddress(req.user.id, id);
  }

  // RGPD endpoints
  @Get('export')
  @ApiOperation({ summary: 'Exporter ses données (RGPD)' })
  @ApiResponse({ status: 200, description: 'Données exportées' })
  async exportData(@Request() req: AuthenticatedRequest) {
    return this.usersService.exportUserData(req.user.id);
  }

  @Delete('account')
  @ApiOperation({ summary: 'Supprimer son compte (RGPD)' })
  @ApiResponse({ status: 200, description: 'Compte supprimé' })
  async deleteAccount(
    @Request() req: AuthenticatedRequest,
    @Body() dto: DeleteAccountDto,
  ) {
    return this.usersService.deleteAccount(req.user.id, dto);
  }

  // Admin endpoints
  @Get()
  @ApiOperation({ summary: 'Liste des utilisateurs (Admin)' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs' })
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    if (req.user.role !== 'ADMIN') {
      return { error: 'Accès non autorisé' };
    }
    return this.usersService.findAll(page, limit, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un utilisateur (Admin)' })
  @ApiResponse({ status: 200, description: 'Détails utilisateur' })
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    if (req.user.role !== 'ADMIN') {
      return { error: 'Accès non autorisé' };
    }
    return this.usersService.findOne(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Activer/Désactiver un utilisateur (Admin)' })
  @ApiResponse({ status: 200, description: 'Statut modifié' })
  async toggleStatus(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    if (req.user.role !== 'ADMIN') {
      return { error: 'Accès non autorisé' };
    }
    return this.usersService.toggleUserStatus(id, isActive);
  }
}
