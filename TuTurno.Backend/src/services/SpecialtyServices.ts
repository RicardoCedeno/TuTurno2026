//servicio para specialty
import { SpecialtyRepository } from "../repositories/SpeciatyRepository";
import { Specialty } from "../models/entities/Specialty";
import { v4 as uuidv4 } from 'uuid';

export class SpecialtyServices {
    private specialtyRepository: SpecialtyRepository;

    constructor() {
        this.specialtyRepository = new SpecialtyRepository();
    }

    async getAllSpecialties(): Promise<Specialty[]> {
        return this.specialtyRepository.findAll();
    }

    async getSpecialtyById(id: string): Promise<Specialty> {
        const specialty = await this.specialtyRepository.findById(id);
        if (!specialty) {
            return {} as Specialty;
        }
        return specialty;
    }

    async updateSpecialty(id: string, specialty: Specialty): Promise<Specialty> {
        return this.specialtyRepository.update(id, specialty);
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
    async createSpecialty(specialty: Specialty): Promise<string[]> {
        if (!specialty) return ["la especialización no existe"];
        if (!specialty.name || !specialty.description) return ["nombre y descripción de la especialización son requeridos"];
        specialty.id = uuidv4();
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
