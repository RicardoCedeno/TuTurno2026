import { Decimal } from "@prisma/client/runtime/library";
import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { IPayment } from "./IPayment";
import { IPatient } from "./patient";

export interface IProcedure {
    id: string;
    patientId: string;
    doctorId: string;
    name: string;
    description?: string | null;
    totalSessions: number;
    totalPrice: Decimal;
    status: string;
    startDate?: Date | null;
    endDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;

    patient?: IPatient;
    doctor?: IDoctor;
    appointments?: IAppointment[];
    payments?: IPayment[];
}