import { IAppointment } from "./appointment";
import { IProcedure } from "./procedure";
import { Decimal } from "@prisma/client/runtime/library";

export interface IPayment {
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

    appointment?: IAppointment;
    procedure?: IProcedure;
} 