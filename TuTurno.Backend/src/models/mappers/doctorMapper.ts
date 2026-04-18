import { DoctorDto } from "../dtos/DoctorDto";
import { Doctor } from "../entities/Doctor";

export class DoctorMapper {
    static toDto(doctor: Doctor): DoctorDto {
        return {
            id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            address: doctor.address,
            city: doctor.city,
            state: doctor.state,
            country: doctor.country,
            doctorsSpecialties:doctor.DoctorsSpecialties
        };
    }

    static toEntity(dto: DoctorDto): Doctor {
        return {
            id: dto.id,
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            address: dto.address,
            city: dto.city,
            state: dto.state,
            country: dto.country,
            createdAt: new Date(),
            updatedAt: new Date(),
            DoctorsSpecialties: [],
    };
    }
}