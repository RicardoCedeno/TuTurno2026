import { Decimal } from "@prisma/client/runtime/library";
import { Appointment } from "./Appointment";
import { Procedure } from "./Procedure";

export class Payment {
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

    // Relaciones de navegación
    appointment?: Appointment;
    procedure?: Procedure;

    constructor(data: {
        id: string;
        amount: Decimal;
        method: string;
        appointmentId?: string;
        procedureId?: string;
        status?: string;
        notes?: string;
        paidAt?: Date;
        createdAt?: Date;
        updatedAt?: Date;
        appointment?: Appointment;
        procedure?: Procedure;
    }) {
        this.id = data.id;
        this.appointmentId = data.appointmentId;
        this.procedureId = data.procedureId;
        this.amount = data.amount;
        this.method = data.method;
        this.status = data.status ?? "completed";
        this.notes = data.notes;
        this.paidAt = data.paidAt ?? new Date();
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.appointment = data.appointment;
        this.procedure = data.procedure;
    }
}