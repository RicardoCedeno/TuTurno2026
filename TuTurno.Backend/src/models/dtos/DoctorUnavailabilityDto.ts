import { DoctorDto } from "./DoctorDto";

export interface DoctorUnavailabilityDto {
    id: string;
    doctorId: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    createdAt?: Date;
    updatedAt?: Date;

    doctor?: DoctorDto;
}

