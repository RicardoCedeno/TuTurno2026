import { IAppointment } from "./appointment";

export interface IAppointmentCancellation {
    id: string;
    appointmentId: string;
    cancelledBy: string; // patient | doctor | admin
    reason?: string;
    cancelledAt?: Date;

    appointment?: IAppointment;
}
