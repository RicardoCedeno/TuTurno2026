//servicio para specialty
import { SpecialtyRepository } from "../repositories/SpeciatyRepository";
import { Specialty } from "../models/entities/Specialty";
import {SpecialtyMapper} from "../models/mappers/specialtyMapper";
import { SpecialtyDto } from "../models/dtos/SpecialtyDto";
import { v4 as uuidv4 } from 'uuid';

export class SpecialtyServices {
    private specialtyRepository: SpecialtyRepository;

    constructor() {
        this.specialtyRepository = new SpecialtyRepository();
    }

    async getAllSpecialties(): Promise<SpecialtyDto[]> {
        const specialties = await this.specialtyRepository.findAll();
        return specialties.map(specialty => SpecialtyMapper.toDto(specialty));
    }

    async getSpecialtyById(id: string): Promise<SpecialtyDto> {
        const specialty = await this.specialtyRepository.findById(id);
        if (!specialty) {
            return {} as SpecialtyDto;
        }
        return SpecialtyMapper.toDto(specialty);
    }

    async updateSpecialty(specialtyDto: SpecialtyDto): Promise<string[]> {
        const existingSpecialty = await this.specialtyRepository.findById(specialtyDto.id);
        if (!existingSpecialty) {
            return ["la especialización no existe"];
        }
        try {
            // Map from DTO to entity
            const specialtyToUpdate = new Specialty({
                ...existingSpecialty, // keep fields not present in DTO
                ...specialtyDto      // override with DTO
            });
            await this.specialtyRepository.update(specialtyToUpdate);
            return [];
        } catch (error: any) {
            return [error.message];
        }
    } 

    async deleteSpecialty(id: string): Promise<string[]> {
        const specialty = await this.specialtyRepository.findById(id);
        if (!specialty) {
            return ["la especialización no existe"];
        }
        
        try {
            await this.specialtyRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message];
        }
    }
    async createSpecialty(specialtyDto: SpecialtyDto): Promise<string[]> {
        if (!specialtyDto) return ["la especialización no existe"];
        if (!specialtyDto.name || !specialtyDto.description) return ["nombre y descripción de la especialización son requeridos"];
        
        const specialty = SpecialtyMapper.toEntity({
            ...specialtyDto,
            id: uuidv4()
        });

        try {
            const existingSpecialty = await this.specialtyRepository.findByName(specialty.name);
            if (existingSpecialty) return ["la especialización ya existe"];
            await this.specialtyRepository.create(specialty);
            return [];
        } catch (error: any) {
            return [error.message];
        }
    }
}
