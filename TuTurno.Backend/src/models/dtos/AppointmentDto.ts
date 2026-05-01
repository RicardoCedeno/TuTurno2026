import { AppointmentCancellationDto } from "./AppointmentCancellationDto";
import { DoctorDto } from "./DoctorDto";
import { NotificationDto } from "./NotificationDto";
import { OfficeDto } from "./OfficeDto";
import { PatientDto } from "./PatientDto";

export interface AppointmentDto {
    id: string;
    patientId: string;
    doctorId: string;
    officeId: string;
    date: Date;
    duration: number;
    status: string;
    notes?: string | null;
    createdAt?: Date;
    updatedAt?: Date;

    patient?: PatientDto;
    doctor?: DoctorDto;
    office?: OfficeDto;
    cancellation?: AppointmentCancellationDto;
    notifications?: NotificationDto[];
}

