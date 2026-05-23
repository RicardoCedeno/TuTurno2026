import { ProcedureDto } from "../dtos/ProcedureDto";
import { Procedure } from "../entities/Procedure";

export class ProcedureMapper {
    static toDto(procedure: Procedure): ProcedureDto {
        return {
            id: procedure.id,
            patientId: procedure.patientId,
            doctorId: procedure.doctorId,
            name: procedure.name,
            description: procedure.description,
            totalSessions: procedure.totalSessions,
            totalPrice: procedure.totalPrice,
            status: procedure.status,
            startDate: procedure.startDate,
            endDate: procedure.endDate,
            createdAt: procedure.createdAt,
            updatedAt: procedure.updatedAt,
        };
    }

    static toEntity(dto: ProcedureDto): Procedure {
        return {
            id: dto.id,
            patientId: dto.patientId,
            doctorId: dto.doctorId,
            name: dto.name,
            description: dto.description,
            totalSessions: dto.totalSessions,
            totalPrice: dto.totalPrice,
            status: dto.status,
            startDate: dto.startDate,
            endDate: dto.endDate,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}