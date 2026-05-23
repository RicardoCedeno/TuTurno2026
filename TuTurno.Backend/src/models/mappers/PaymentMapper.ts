import { PaymentDto } from "../dtos/PaymentDto";
import { Payment } from "../entities/Payment";
import { AppointmentMapper } from "./appointmentMapper";
import { ProcedureMapper } from "./ProcedureMapper";

export class PaymentMapper {
    static toDto(payment: Payment): PaymentDto {
        return {
            id: payment.id,
            appointmentId: payment.appointmentId,
            procedureId: payment.procedureId,
            amount: payment.amount,
            method: payment.method,
            status: payment.status,
            notes: payment.notes,
            paidAt: payment.paidAt,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
            appointment: payment.appointment ? AppointmentMapper.toDto(payment.appointment) : undefined,
            procedure: payment.procedure ? ProcedureMapper.toDto(payment.procedure) : undefined,
        };
    }

    static toEntity(dto: PaymentDto): Payment {
        return {
            id: dto.id,
            appointmentId: dto.appointmentId,
            procedureId: dto.procedureId,
            amount: dto.amount,
            method: dto.method,
            status: dto.status,
            notes: dto.notes,
            paidAt: dto.paidAt,
            createdAt: dto.createdAt ?? new Date(),
            updatedAt: dto.updatedAt ?? new Date(),
            appointment: dto.appointment ? AppointmentMapper.toEntity(dto.appointment) : undefined,
            procedure: dto.procedure ? ProcedureMapper.toEntity(dto.procedure) : undefined,
        };
    }

    static toEntityFromPrisma(prismaPayment: any): Payment {
        return {
            id: prismaPayment.id,
            appointmentId: prismaPayment.appointmentId,
            procedureId: prismaPayment.procedureId,
            amount: prismaPayment.amount,
            method: prismaPayment.method,
            status: prismaPayment.status,
            notes: prismaPayment.notes,
            paidAt: prismaPayment.paidAt,
            createdAt: prismaPayment.createdAt,
            updatedAt: prismaPayment.updatedAt,
            appointment: prismaPayment.appointment ? AppointmentMapper.toEntity(prismaPayment.appointment) : undefined,
            procedure: prismaPayment.procedure ? ProcedureMapper.toEntity(prismaPayment.procedure) : undefined,
        };
    }
}