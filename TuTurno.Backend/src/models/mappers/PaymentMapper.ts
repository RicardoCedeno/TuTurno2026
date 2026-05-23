import { PaymentDto } from "../dtos/PaymentDto";
import { Payment } from "../entities/Payment";

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
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}