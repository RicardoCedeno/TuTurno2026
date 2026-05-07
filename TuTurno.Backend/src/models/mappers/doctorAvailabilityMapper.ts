import { DoctorAvailabilityDto } from "../dtos/DoctorAvailabilityDto";
import { DoctorAvailability } from "../entities/DoctorAvailability";

export class DoctorAvailabilityMapper {
    static toDto(entity: DoctorAvailability): DoctorAvailabilityDto {
        return {
            id: entity.id,
            doctorId: entity.doctorId,
            dayOfWeek: entity.dayOfWeek,
            startTime: entity.startTime,
            endTime: entity.endTime
        };
    }

    static toEntity(dto: DoctorAvailabilityDto): DoctorAvailability {
        return new DoctorAvailability({
            id: dto.id || "",
            doctorId: dto.doctorId,
            dayOfWeek: dto.dayOfWeek,
            startTime: dto.startTime,
            endTime: dto.endTime
        });
    }
}
