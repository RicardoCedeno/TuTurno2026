import { IPatient } from "./patient";
import { IAppointment } from "./appointment";

export interface INotification {
    id: string;
    patientId: string;
    appointmentId?: string;
    type: string; // appointment_reminder | appointment_confirmed | appointment_cancelled
    channel: string; // email | sms | whatsapp
    status?: string; // pending | sent | failed
    scheduledAt: Date;
    sentAt?: Date;
    createdAt?: Date;

    patient?: IPatient;
    appointment?: IAppointment;
}