import { PatientDto } from "../dtos/PatientDto";
import { Patient } from "../entities/Patient";
import { AppointmentMapper } from "./appointmentMapper";
import { NotificationMapper } from "./notificationMapper";
import { ProcedureMapper } from "./ProcedureMapper";

export class PatientMapper {
    static toDto(patient: Patient): PatientDto {
        return {
            id: patient.id,
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            birthDate: patient.birthDate,
            gender: patient.gender,
            address: patient.address ?? undefined,
            city: patient.city ?? undefined,
            state: patient.state ?? undefined,
            country: patient.country ?? undefined,
            active: patient.active,
            createdAt: patient.createdAt,
            updatedAt: patient.updatedAt,
            appointments: patient.appointments?.map((appointment) => AppointmentMapper.toDto(appointment)),
            notifications: patient.notifications?.map((notification) => NotificationMapper.toDto(notification)),
            procedures: patient.procedures?.map((procedure) => ProcedureMapper.toDto(procedure)),
        };
    }

    static toEntity(dto: PatientDto): Patient {
        return {
            id: dto.id,
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            birthDate: dto.birthDate,
            gender: dto.gender,
            address: dto.address,
            city: dto.city,
            state: dto.state,
            country: dto.country,
            active: dto.active,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

