import { DoctorDto } from "./DoctorDto";

export interface DoctorAvailabilityDto {
    id: string;
    doctorId: string;
    dayOfWeek: number; // 0=domingo, 1=lunes ... 6=sabado
    startTime: string; // Ej: "08:00"
    endTime: string; // Ej: "17:00"
    createdAt?: Date;
    updatedAt?: Date;

    doctor?: DoctorDto;
}

