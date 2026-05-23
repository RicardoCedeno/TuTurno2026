import { Decimal } from "@prisma/client/runtime/library";
import { PatientDto } from "./PatientDto";
import { DoctorDto } from "./DoctorDto";
import { AppointmentDto } from "./AppointmentDto";
import { PaymentDto } from "./PaymentDto";

export interface ProcedureDto {
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

    patient?: PatientDto;
    doctor?: DoctorDto;
    appointments?: AppointmentDto[];
    payments?: PaymentDto[];
}