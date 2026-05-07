import { AppointmentCancellationDto } from "../dtos/AppointmentCancellationDto";
import { AppointmentCancellation } from "../entities/AppointmentCancellation";
import { AppointmentMapper } from "./appointmentMapper";

export class AppointmentCancellationMapper {
    static toDto(appointmentCancellation: AppointmentCancellation): AppointmentCancellationDto {
        return {
            id: appointmentCancellation.id,
            appointmentId: appointmentCancellation.appointmentId,
            cancelledBy: appointmentCancellation.cancelledBy,
            reason: appointmentCancellation.reason,
            cancelledAt: appointmentCancellation.cancelledAt,
            appointment: appointmentCancellation.appointment ? AppointmentMapper.toDto(appointmentCancellation.appointment) : undefined
        };
    }

    static toEntity(dto: AppointmentCancellationDto): AppointmentCancellation {
        return new AppointmentCancellation({
            id: dto.id,
            appointmentId: dto.appointmentId,
            cancelledBy: dto.cancelledBy,
            reason: dto.reason,
            cancelledAt: dto.cancelledAt,
        });
    }
}

