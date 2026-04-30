import { Doctor } from "./Doctor";

export class DoctorUnavailability {
    id: string;
    doctorId: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    createdAt?: Date;
    updatedAt?: Date;

    // Relación de navegación
    doctor?: Doctor;

    constructor(data: {
        id: string;
        doctorId: string;
        startDate: Date;
        endDate: Date;
        reason?: string;
        createdAt?: Date;
        updatedAt?: Date;
        doctor?: Doctor;
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