import { IAppointment } from "./appointment";
import { INotification } from "./notification";

export interface IPatient {
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

    appointments?: IAppointment[];
    notifications?: INotification[];
}