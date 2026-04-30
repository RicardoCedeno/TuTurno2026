import { AppointmentDto } from "./AppointmentDto";
import { NotificationDto } from "./NotificationDto";

export interface PatientDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: string; // "male" | "female" | "other"
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    appointments?: AppointmentDto[];
    notifications?: NotificationDto[];
}

