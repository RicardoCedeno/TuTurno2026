import { AppointmentCancellationDto } from "./AppointmentCancellationDto";
import { DoctorDto } from "./DoctorDto";
import { NotificationDto } from "./NotificationDto";
import { OfficeDto } from "./OfficeDto";
import { PatientDto } from "./PatientDto";
import { ProcedureDto } from "./ProcedureDto";
import { PaymentDto } from "./PaymentDto";

export interface AppointmentDto {
    id: string;
    patientId: string;
    doctorId: string;
    officeId: string;
    date: Date;
    duration: number;
    status: string;
    notes?: string | null;
    procedureId?: string | null;
    procedureSession?: number | null;
    createdAt?: Date;
    updatedAt?: Date;

    patient?: PatientDto;
    doctor?: DoctorDto;
    office?: OfficeDto;
    cancellation?: AppointmentCancellationDto;
    notifications?: NotificationDto[];
    procedure?: ProcedureDto;
    payments?: PaymentDto[];
}

