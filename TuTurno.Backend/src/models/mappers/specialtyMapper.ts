import { SpecialtyDto } from "../dtos/SpecialtyDto";
import { Specialty } from "../entities/Specialty";

//mapeo de specialty a dto y entity
export class SpecialtyMapper {
    static toDto(specialty: Specialty): SpecialtyDto {
        return {
            id: specialty.id,
            name: specialty.name,
            description: specialty.description,
            doctorsSpecialties: specialty.doctorsSpecialties,
        };
    }

    static toEntity(dto: SpecialtyDto): Specialty {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            createdAt: new Date(),
            updatedAt: new Date(),
            doctorsSpecialties: [],
        };
    }
}