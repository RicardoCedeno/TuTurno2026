import { Appointment } from "./Appointment";

export class AppointmentCancellation {
    id: string;
    appointmentId: string;
    cancelledBy: string; // patient | doctor | admin
    reason?: string;
    cancelledAt?: Date;

    // Relación de navegación
    appointment?: Appointment;

    constructor(data: {
        id: string;
        appointmentId: string;
        cancelledBy: string;
        reason?: string;
        cancelledAt?: Date;
        appointment?: Appointment;
    }) {
        this.id = data.id;
        this.appointmentId = data.appointmentId;
        this.cancelledBy = data.cancelledBy;
        this.reason = data.reason;
        this.cancelledAt = data.cancelledAt;
        this.appointment = data.appointment;
    }
}