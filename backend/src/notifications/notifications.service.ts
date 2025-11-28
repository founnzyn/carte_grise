import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, NotificationFilterDto } from './dto/notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        title: dto.title,
        message: dto.message,
        type: dto.type,
        metadata: dto.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async findAll(userId: string, filters: NotificationFilterDto) {
    const { isRead, type, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.NotificationWhereInput = { userId };

    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    if (type) {
      where.type = type;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    return {
      data: notifications,
      meta: {
        total,
        unreadCount,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    return notification;
  }

  async markAsRead(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { message: 'Toutes les notifications ont été marquées comme lues' };
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.notification.delete({ where: { id } });

    return { message: 'Notification supprimée' };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });

    return { unreadCount: count };
  }

  // Professional notifications
  async notifyProfessional(
    professionalId: string,
    title: string,
    message: string,
    type: string,
    metadata?: Record<string, unknown>,
  ) {
    return this.create({
      userId: professionalId,
      title,
      message,
      type,
      metadata,
    });
  }

  // Batch notifications for professionals
  async notifyAllProfessionals(
    title: string,
    message: string,
    type: string,
    metadata?: Record<string, unknown>,
  ) {
    const professionals = await this.prisma.user.findMany({
      where: { role: 'PROFESSIONAL', isActive: true },
      select: { id: true },
    });

    const notifications: Prisma.NotificationCreateManyInput[] = professionals.map((pro) => ({
      userId: pro.id,
      title,
      message,
      type,
      metadata: metadata as Prisma.InputJsonValue | undefined,
    }));

    await this.prisma.notification.createMany({
      data: notifications,
    });

    return { count: notifications.length };
  }
}
