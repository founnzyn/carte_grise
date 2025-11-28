import { NotificationsService } from './notifications.service';
import { NotificationFilterDto } from './dto/notifications.dto';
interface AuthenticatedRequest {
    user: {
        id: string;
    };
}
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: AuthenticatedRequest, filters: NotificationFilterDto): Promise<{
        data: {
            type: string;
            title: string;
            message: string;
            id: string;
            createdAt: Date;
            userId: string;
            isRead: boolean;
            readAt: Date | null;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        meta: {
            total: number;
            unreadCount: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUnreadCount(req: AuthenticatedRequest): Promise<{
        unreadCount: number;
    }>;
    findOne(req: AuthenticatedRequest, id: string): Promise<{
        type: string;
        title: string;
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        readAt: Date | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    markAsRead(req: AuthenticatedRequest, id: string): Promise<{
        type: string;
        title: string;
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        isRead: boolean;
        readAt: Date | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    markAllAsRead(req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    delete(req: AuthenticatedRequest, id: string): Promise<{
        message: string;
    }>;
}
export {};
