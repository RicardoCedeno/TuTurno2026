import { PatientRepository } from "../repositories/PatientRepository";
import { PatientDto } from "../models/dtos/PatientDto";
import { PatientMapper } from "../models/mappers/patientMapper";
import { v4 as uuidv4 } from "uuid";

export class PatientServices {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async getAllPatients(): Promise<PatientDto[]> {
        const patients = await this.patientRepository.findAll();
        return patients.map((patient) => PatientMapper.toDto(patient));
    }

    async getPatientById(id: string): Promise<PatientDto> {
        if (!id) return {} as PatientDto;
        const patient = await this.patientRepository.findById(id);
        if (!patient) return {} as PatientDto;
        return PatientMapper.toDto(patient);
    }

    async createPatient(patient: PatientDto): Promise<string[]> {
        if (!patient) return ["el paciente no existe"];
        if (!patient.name || !patient.email || !patient.phone || !patient.birthDate || !patient.gender) {
            return ["nombre, email, teléfono, fecha de nacimiento y género son requeridos"];
        }

        const patientWithId = {
            ...patient,
            id: patient.id ?? uuidv4(),
        };
        const patientEntity = PatientMapper.toEntity(patientWithId);

        try {
            const existingPatient = await this.patientRepository.findById(patientEntity.id);
            if (existingPatient) {
                return ["ya existe un paciente con el mismo id"];
            }
            await this.patientRepository.create(patientEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear el paciente"];
        }
    }

    async updatePatient(patient: PatientDto): Promise<string[]> {
        if (!patient) return ["el paciente no existe"];
        if (!patient.id) return ["el id del paciente es requerido"];
        if (!patient.name || !patient.email || !patient.phone || !patient.birthDate || !patient.gender) {
            return ["nombre, email, teléfono, fecha de nacimiento y género son requeridos"];
        }

        const patientEntity = PatientMapper.toEntity(patient);
        try {
            const existingPatient = await this.patientRepository.findById(patientEntity.id);
            if (!existingPatient) {
                return ["el paciente no existe"];
            }
            await this.patientRepository.update(patientEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al actualizar el paciente"];
        }
    }

    async deletePatient(id: string): Promise<string[]> {
        if (!id) return ["el paciente no existe"];

        try {
            const existingPatient = await this.patientRepository.findById(id);
            if (!existingPatient) {
                return ["el paciente no existe"];
            }
            await this.patientRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar el paciente"];
        }
    }
}
