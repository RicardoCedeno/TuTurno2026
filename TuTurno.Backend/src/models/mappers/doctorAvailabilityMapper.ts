import { DoctorAvailabilityDto } from "../dtos/DoctorAvailabilityDto";
import { DoctorAvailability } from "../entities/DoctorAvailability";

export class DoctorAvailabilityMapper {
    static toDto(doctorAvailability: DoctorAvailability): DoctorAvailabilityDto {
        return {
            id: doctorAvailability.id,
            doctorId: doctorAvailability.doctorId,
            dayOfWeek: doctorAvailability.dayOfWeek,
            startTime: doctorAvailability.startTime,
            endTime: doctorAvailability.endTime,
            createdAt: doctorAvailability.createdAt,
            updatedAt: doctorAvailability.updatedAt,
        };
    }

    static toEntity(dto: DoctorAvailabilityDto): DoctorAvailability {
        return {
            id: dto.id,
            doctorId: dto.doctorId,
            dayOfWeek: dto.dayOfWeek,
            startTime: dto.startTime,
            endTime: dto.endTime,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

