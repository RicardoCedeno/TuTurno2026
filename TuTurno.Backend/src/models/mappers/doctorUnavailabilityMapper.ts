import { DoctorUnavailabilityDto } from "../dtos/DoctorUnavailabilityDto";
import { DoctorUnavailability } from "../entities/DoctorUnavailability";

export class DoctorUnavailabilityMapper {
    static toDto(doctorUnavailability: DoctorUnavailability): DoctorUnavailabilityDto {
        return {
            id: doctorUnavailability.id,
            doctorId: doctorUnavailability.doctorId,
            startDate: doctorUnavailability.startDate,
            endDate: doctorUnavailability.endDate,
            reason: doctorUnavailability.reason,
            createdAt: doctorUnavailability.createdAt,
            updatedAt: doctorUnavailability.updatedAt,
        };
    }

    static toEntity(dto: DoctorUnavailabilityDto): DoctorUnavailability {
        return {
            id: dto.id,
            doctorId: dto.doctorId,
            startDate: dto.startDate,
            endDate: dto.endDate,
            reason: dto.reason,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

