import { Decimal } from "@prisma/client/runtime/library";
import { AppointmentDto } from "./AppointmentDto";
import { ProcedureDto } from "./ProcedureDto";

export interface PaymentDto {
    id: string;
    appointmentId?: string | null;
    procedureId?: string | null;
    amount: Decimal;
    method: string;
    status: string;
    notes?: string | null;
    paidAt: Date;
    createdAt?: Date;
    updatedAt?: Date;

    appointment?: AppointmentDto;
    procedure?: ProcedureDto;
}