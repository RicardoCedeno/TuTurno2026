import { Doctor } from "@prisma/client";
import { Patient } from "./Patient";
import { Office } from "./Office";
import { AppointmentCancellation } from "./AppointmentCancellation";
import { Notification } from "./Notification";
import { Procedure } from "./Procedure";
import { Payment } from "./Payment";

export class Appointment {
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

    // Relaciones de navegación (puedes agregar las referencias concretas a las entidades si ya existen)
    patient?: Patient;
    doctor?: Doctor;
    office?: Office;
    cancellation?: AppointmentCancellation;
    notifications?: Notification[] = [];
    procedure?: Procedure;
    payments?: Payment[] = [];

    constructor(data: {
        id: string;
        patientId: string;
        doctorId: string;
        officeId: string;
        date: Date;
        duration?: number;
        status?: string;
        notes?: string;
        procedureId?: string;
        procedureSession?: number;
        createdAt?: Date;
        updatedAt?: Date;
        patient?: Patient;
        doctor?: Doctor;
        office?: Office;
        cancellation?: AppointmentCancellation;
        notifications?: Notification[];
        procedure?: Procedure;
        payments?: Payment[];
    }) {
        this.id = data.id;
        this.patientId = data.patientId;
        this.doctorId = data.doctorId;
        this.officeId = data.officeId;
        this.date = data.date;
        this.duration = data.duration ?? 30;
        this.status = data.status ?? "scheduled";
        this.notes = data.notes;
        this.procedureId = data.procedureId;
        this.procedureSession = data.procedureSession;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.patient = data.patient;
        this.doctor = data.doctor;
        this.office = data.office;
        this.cancellation = data.cancellation;
        this.notifications = data.notifications ?? [];
        this.procedure = data.procedure;
        this.payments = data.payments ?? [];
    }
}