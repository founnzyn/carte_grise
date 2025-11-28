export declare class CreateNotificationDto {
    userId: string;
    title: string;
    message: string;
    type: string;
    metadata?: Record<string, unknown>;
}
export declare class NotificationFilterDto {
    isRead?: boolean;
    type?: string;
    page?: number;
    limit?: number;
}
