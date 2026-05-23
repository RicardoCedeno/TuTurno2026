import { Decimal } from "@prisma/client/runtime/library";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";
import { Appointment } from "./Appointment";
import { Payment } from "./Payment";

export class Procedure {
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

    patient?: Patient;
    doctor?: Doctor;
    appointments?: Appointment[] = [];
    payments?: Payment[] = [];

    constructor(data: {
        id: string;
        patientId: string;
        doctorId: string;
        name: string;
        totalSessions: number;
        totalPrice: Decimal;
        description?: string;
        status?: string;
        startDate?: Date;
        endDate?: Date;
        createdAt?: Date;
        updatedAt?: Date;
        patient?: Patient;
        doctor?: Doctor;
        appointments?: Appointment[];
        payments?: Payment[];
    }) {
        this.id = data.id;
        this.patientId = data.patientId;
        this.doctorId = data.doctorId;
        this.name = data.name;
        this.totalSessions = data.totalSessions;
        this.totalPrice = data.totalPrice;
        this.description = data.description;
        this.status = data.status ?? "active";
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.patient = data.patient;
        this.doctor = data.doctor;
        this.appointments = data.appointments ?? [];
        this.payments = data.payments ?? [];
    }
}