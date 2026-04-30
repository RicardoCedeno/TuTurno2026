import { Appointment } from "./Appointment";
import { Patient } from "./Patient";

export class Notification {
    id: string;
    patientId: string;
    appointmentId?: string;
    type: string; // appointment_reminder | appointment_confirmed | appointment_cancelled
    channel: string; // email | sms | whatsapp
    status: string; // pending | sent | failed
    scheduledAt: Date;
    sentAt?: Date;
    createdAt?: Date;

    // Relaciones de navegación (puedes agregar las referencias concretas a las entidades si ya existen)
    patient?: Patient;
    appointment?: Appointment;

    constructor(data: {
        id: string;
        patientId: string;
        appointmentId?: string;
        type: string;
        channel: string;
        status?: string;
        scheduledAt: Date;
        sentAt?: Date;
        createdAt?: Date;
        patient?: Patient;
        appointment?: Appointment;
    }) {
        this.id = data.id;
        this.patientId = data.patientId;
        this.appointmentId = data.appointmentId;
        this.type = data.type;
        this.channel = data.channel;
        this.status = data.status ?? "pending";
        this.scheduledAt = data.scheduledAt;
        this.sentAt = data.sentAt;
        this.createdAt = data.createdAt;
        this.patient = data.patient;
        this.appointment = data.appointment;
    }
}