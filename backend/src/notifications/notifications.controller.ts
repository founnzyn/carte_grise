import {
  Controller,
  Get,
  Post,
  Delete,
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
import { NotificationsService } from './notifications.service';
import { NotificationFilterDto } from './dto/notifications.dto';

interface AuthenticatedRequest {
  user: {
    id: string;
  };
}

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des notifications' })
  @ApiResponse({ status: 200, description: 'Liste des notifications' })
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query() filters: NotificationFilterDto,
  ) {
    return this.notificationsService.findAll(req.user.id, filters);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Nombre de notifications non lues' })
  @ApiResponse({ status: 200, description: 'Nombre de notifications non lues' })
  async getUnreadCount(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.getUnreadCount(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'une notification' })
  @ApiResponse({ status: 200, description: 'Détails de la notification' })
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.notificationsService.findOne(id, req.user.id);
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Marquer une notification comme lue' })
  @ApiResponse({ status: 200, description: 'Notification marquée comme lue' })
  async markAsRead(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.notificationsService.markAsRead(id, req.user.id);
  }

  @Post('read-all')
  @ApiOperation({ summary: 'Marquer toutes les notifications comme lues' })
  @ApiResponse({ status: 200, description: 'Toutes les notifications marquées comme lues' })
  async markAllAsRead(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une notification' })
  @ApiResponse({ status: 200, description: 'Notification supprimée' })
  async delete(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.notificationsService.delete(id, req.user.id);
  }
}
