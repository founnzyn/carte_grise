import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, NotificationFilterDto } from './dto/notifications.dto';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNotificationDto): Promise<{
        type: string;
        title: string;
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        readAt: Date | null;
        metadata: Prisma.JsonValue | null;
    }>;
    findAll(userId: string, filters: NotificationFilterDto): Promise<{
        data: {
            type: string;
            title: string;
            message: string;
            id: string;
            createdAt: Date;
            userId: string;
            isRead: boolean;
            readAt: Date | null;
            metadata: Prisma.JsonValue | null;
        }[];
        meta: {
            total: number;
            unreadCount: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, userId: string): Promise<{
        type: string;
        title: string;
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        readAt: Date | null;
        metadata: Prisma.JsonValue | null;
    }>;
    markAsRead(id: string, userId: string): Promise<{
        type: string;
        title: string;
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        readAt: Date | null;
        metadata: Prisma.JsonValue | null;
    }>;
    markAllAsRead(userId: string): Promise<{
        message: string;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    getUnreadCount(userId: string): Promise<{
        unreadCount: number;
    }>;
    notifyProfessional(professionalId: string, title: string, message: string, type: string, metadata?: Record<string, unknown>): Promise<{
        type: string;
        title: string;
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        readAt: Date | null;
        metadata: Prisma.JsonValue | null;
    }>;
    notifyAllProfessionals(title: string, message: string, type: string, metadata?: Record<string, unknown>): Promise<{
        count: number;
    }>;
}
