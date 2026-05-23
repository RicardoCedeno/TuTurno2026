import { AppointmentDto } from "../dtos/AppointmentDto";
import { Appointment } from "../entities/Appointment";

export class AppointmentMapper {
    static toDto(appointment: Appointment): AppointmentDto {
        return {
            id: appointment.id,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            officeId: appointment.officeId,
            date: appointment.date,
            duration: appointment.duration,
            status: appointment.status,
            notes: appointment.notes,
            procedureId: appointment.procedureId,
            procedureSession: appointment.procedureSession,
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt,
        };
    }

    static toEntity(dto: AppointmentDto): Appointment {
        return {
            id: dto.id,
            patientId: dto.patientId,
            doctorId: dto.doctorId,
            officeId: dto.officeId,
            date: dto.date,
            duration: dto.duration,
            status: dto.status,
            notes: dto.notes,
            procedureId: dto.procedureId,
            procedureSession: dto.procedureSession,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

