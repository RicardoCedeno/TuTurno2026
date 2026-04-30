import { PatientDto } from "../dtos/PatientDto";
import { Patient } from "../entities/Patient";

export class PatientMapper {
    static toDto(patient: Patient): PatientDto {
        return {
            id: patient.id,
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            birthDate: patient.birthDate,
            gender: patient.gender,
            address: patient.address,
            city: patient.city,
            state: patient.state,
            country: patient.country,
            active: patient.active,
            createdAt: patient.createdAt,
            updatedAt: patient.updatedAt,
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

