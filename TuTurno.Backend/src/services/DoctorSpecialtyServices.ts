import { DoctorSpecialtyRepository } from "../repositories/DoctorSpecialtyRepository";
import { DoctorSpecialty } from "../models/entities/DoctorSpecialty";
import DoctorSpecialtyDto from "../models/dtos/DoctorSpecialtyDto";
import { v4 as uuidv4 } from 'uuid';

// servicio para manejar la relación entre doctor y especialidades
export class DoctorSpecialtyServices {
    private doctorSpecialtyRepository: DoctorSpecialtyRepository;

    constructor() {
        this.doctorSpecialtyRepository = new DoctorSpecialtyRepository();
    }

    async syncDoctorSpecialties(doctorId: string, specialties?: DoctorSpecialtyDto[]): Promise<string[]> {
        try {
            const existingRelations = await this.doctorSpecialtyRepository.findByDoctorId(doctorId);
            const targetSpecialtyIds = specialties
                ? Array.from(new Set(specialties.map((specialty) => specialty.specialtyId)))
                : [];

            const existingSpecialtyIds = new Set(existingRelations.map((relation) => relation.specialtyId));

            const toRemove = existingRelations.filter((relation) => !targetSpecialtyIds.includes(relation.specialtyId));
            for (const relation of toRemove) {
                await this.doctorSpecialtyRepository.delete(relation.id);
            }

            const toAddIds = targetSpecialtyIds.filter((id) => !existingSpecialtyIds.has(id));
            for (const specialtyId of toAddIds) {
                const relation: DoctorSpecialty = {
                    id: uuidv4(),
                    doctorId,
                    specialtyId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                await this.doctorSpecialtyRepository.create(relation);
            }

            return [];
        } catch (error: any) {
            return [error.message || "Error al sincronizar especialidades del doctor"];
        }
    }

    async deleteByDoctorId(doctorId: string): Promise<string[]> {
        try {
            const relations = await this.doctorSpecialtyRepository.findByDoctorId(doctorId);
            for (const relation of relations) {
                await this.doctorSpecialtyRepository.delete(relation.id);
            }
            return [];
        } catch (error: any) {
            return [error.message || "Error al eliminar las especialidades del doctor"];
        }
    }

    async findBySpecialtyId(specialtyId: string): Promise<DoctorSpecialty[]> {
        try {
            return await this.doctorSpecialtyRepository.findBySpecialtyId(specialtyId);
        } catch {
            return [];
        }
    }
}
