import { AppointmentDto } from "./AppointmentDto";

export interface AppointmentCancellationDto {
    id: string;
    appointmentId: string;
    cancelledBy: string; // patient | doctor | admin
    reason?: string;
    cancelledAt?: Date;

    appointment?: AppointmentDto;
}

