import { Doctor } from "./Doctor";

export class DoctorAvailability {
    id: string;
    doctorId: string;
    dayOfWeek: number; // 0=domingo, 1=lunes ... 6=sabado
    startTime: string; // Ej: "08:00"
    endTime: string;   // Ej: "17:00"
    createdAt?: Date;
    updatedAt?: Date;

    // Relación de navegación
    doctor?: Doctor;

    constructor(data: DoctorAvailability) {
        this.id = data.id;
        this.doctorId = data.doctorId;
        this.dayOfWeek = data.dayOfWeek;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.doctor = data.doctor;
    }
}