import { AppointmentDto } from "./AppointmentDto";
import { PatientDto } from "./PatientDto";

export interface NotificationDto {
    id: string;
    patientId: string;
    appointmentId?: string;
    type: string; // appointment_reminder | appointment_confirmed | appointment_cancelled
    channel: string; // email | sms | whatsapp
    status?: string; // pending | sent | failed
    scheduledAt: Date;
    sentAt?: Date;
    createdAt?: Date;

    patient?: PatientDto;
    appointment?: AppointmentDto;
}

