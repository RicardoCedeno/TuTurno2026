import DoctorSpecialtyDto from "../dtos/DoctorSpecialtyDto";
import { DoctorSpecialty } from "../entities/DoctorSpecialty";

//mapeo de doctorSpecialty a dto y entity
export class DoctorSpecialtyMapper {
    static toDto(doctorSpecialty: DoctorSpecialty): DoctorSpecialtyDto {
        return {
            id: doctorSpecialty.id,
            doctorId: doctorSpecialty.doctorId,
            specialtyId: doctorSpecialty.specialtyId,
            doctor: doctorSpecialty.doctor,
            specialty: doctorSpecialty.specialty,
        };
    }

    static toEntity(dto: DoctorSpecialtyDto): DoctorSpecialty {
        return {
            id: dto.id,
            doctorId: dto.doctorId,
            specialtyId: dto.specialtyId,
            doctor: dto.doctor,
            specialty: dto.specialty,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}