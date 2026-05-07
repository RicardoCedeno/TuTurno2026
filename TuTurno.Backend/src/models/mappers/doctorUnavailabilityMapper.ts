import { DoctorUnavailabilityDto } from "../dtos/DoctorUnavailabilityDto";
import { DoctorUnavailability } from "../entities/DoctorUnavailability";

export class DoctorUnavailabilityMapper {
    static toDto(entity: DoctorUnavailability): DoctorUnavailabilityDto {
        return {
            id: entity.id,
            doctorId: entity.doctorId,
            startDate: entity.startDate,
            endDate: entity.endDate,
            reason: entity.reason
        };
    }

    static toEntity(dto: DoctorUnavailabilityDto): DoctorUnavailability {
        return new DoctorUnavailability({
            id: dto.id || "",
            doctorId: dto.doctorId,
            startDate: dto.startDate,
            endDate: dto.endDate,
            reason: dto.reason
        });
    }
}
