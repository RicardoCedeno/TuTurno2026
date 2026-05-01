import { IAppointmentCancellation } from "./appointmentCancellation";
import { IDoctor } from "./doctor";
import { IOffice } from "./office";
import { IPatient } from "./patient";
import { INotification } from "./notification";

export interface IAppointment {
    id: string;
    patientId: string;
    doctorId: string;
    officeId: string;
    date: Date;
    duration: number;
    status: string;
    notes?: string | null;
    createdAt?: Date;
    updatedAt?: Date;

    patient?: IPatient;
    doctor?: IDoctor;
    office?: IOffice;
    cancellation?: IAppointmentCancellation;
    notifications?: INotification[];
}