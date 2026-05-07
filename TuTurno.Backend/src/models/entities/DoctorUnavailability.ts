import { Doctor } from "./Doctor";

export class DoctorUnavailability {
    id: string;
    doctorId: string;
    startDate: Date;
    endDate: Date;
    reason?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    // Relación de navegación
    doctor?: Doctor | null;

    constructor(data: {
        id: string;
        doctorId: string;
        startDate: Date;
        endDate: Date;
        reason?: string | null;
        createdAt?: Date | null;
        updatedAt?: Date | null;
        doctor?: Doctor | null;
    }) {
        this.id = data.id;
        this.doctorId = data.doctorId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.reason = data.reason;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.doctor = data.doctor;
    }
}