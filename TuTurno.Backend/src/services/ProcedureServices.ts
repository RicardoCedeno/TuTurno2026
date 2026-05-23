import { ProcedureRepository } from "../repositories/ProcedureRepository";
import { ProcedureDto } from '../models/dtos/ProcedureDto';
import { ProcedureMapper } from "../models/mappers/ProcedureMapper";
import { v4 as uuidv4 } from 'uuid';

export class ProcedureServices {
    private procedureRepository: ProcedureRepository;

    constructor() {
        this.procedureRepository = new ProcedureRepository();
    }

    async getAllProcedures(): Promise<ProcedureDto[]> {
        const procedures = await this.procedureRepository.findAll();
        return procedures.map(proc => ProcedureMapper.toDto(proc));
    }

    async getProceduresByPatient(patientId: string): Promise<ProcedureDto[]> {
        if (!patientId) return [];
        const procedures = await this.procedureRepository.findByPatientId(patientId);
        return procedures.map(proc => ProcedureMapper.toDto(proc));
    }

    async getProceduresByDoctor(doctorId: string): Promise<ProcedureDto[]> {
        if (!doctorId) return [];
        const procedures = await this.procedureRepository.findByDoctorId(doctorId);
        return procedures.map(proc => ProcedureMapper.toDto(proc));
    }

    async getProcedureById(id: string): Promise<ProcedureDto | null> {
        if (!id) return null;
        const procedure = await this.procedureRepository.findById(id);
        return procedure ? ProcedureMapper.toDto(procedure) : null;
    }

    async createProcedure(dto: ProcedureDto): Promise<string[]> {
        if (!dto) return ["El procedimiento no existe"];
        if (!dto.patientId || !dto.doctorId || !dto.name || dto.totalSessions === undefined || dto.totalPrice === undefined) {
            return ["El paciente, doctor, nombre, sesiones totales y precio total son requeridos"];
        }

        if (!dto.id) {
            dto.id = uuidv4();
        }

        try {
            const procedureEntity = ProcedureMapper.toEntity(dto);
            await this.procedureRepository.create(procedureEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear el procedimiento"];
        }
    }

    async updateProcedure(dto: ProcedureDto): Promise<string[]> {
        if (!dto || !dto.id) return ["El procedimiento o el id no existe"];
        if (!dto.patientId || !dto.doctorId || !dto.name || dto.totalSessions === undefined || dto.totalPrice === undefined) {
            return ["El paciente, doctor, nombre, sesiones totales y precio total son requeridos"];
        }

        try {
            const existingProcedure = await this.procedureRepository.findById(dto.id);
            if (!existingProcedure) {
                return ["El procedimiento no existe"];
            }
            const procedureEntity = ProcedureMapper.toEntity(dto);
            await this.procedureRepository.update(procedureEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al actualizar el procedimiento"];
        }
    }

    async deleteProcedure(id: string): Promise<string[]> {
        if (!id) return ["El id del procedimiento es requerido"];
        try {
            const existingProcedure = await this.procedureRepository.findById(id);
            if (!existingProcedure) {
                return ["El procedimiento no existe"];
            }
            // Borrado en cascada nativo configurado en prisma/schema.prisma
            await this.procedureRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar el procedimiento"];
        }
    }
}
