import { NotificationDto } from "../dtos/NotificationDto";
import { Notification } from "../entities/Notification";

export class NotificationMapper {
    static toDto(notification: Notification): NotificationDto {
        return {
            id: notification.id,
            patientId: notification.patientId,
            appointmentId: notification.appointmentId,
            type: notification.type,
            channel: notification.channel,
            status: notification.status,
            scheduledAt: notification.scheduledAt,
            sentAt: notification.sentAt,
            createdAt: notification.createdAt,
        };
    }

    static toEntity(dto: NotificationDto): Notification {
        return {
            id: dto.id,
            patientId: dto.patientId,
            appointmentId: dto.appointmentId,
            type: dto.type,
            channel: dto.channel,
            status: dto.status ?? "pending",
            scheduledAt: dto.scheduledAt,
            sentAt: dto.sentAt,
            createdAt: new Date(),
        };
    }
}

