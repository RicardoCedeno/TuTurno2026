import { Appointment } from "./Appointment";
import { Notification } from "./Notification";
import { Procedure } from "./Procedure";

export class Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    gender: string; // "male" | "female" | "other"
    address?: string | null | undefined;
    city?: string | null | undefined;
    state?: string | null | undefined;
    country?: string | null | undefined;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    // Relaciones (puedes agregar clases/entities reales según existan en el proyecto)
    appointments?: Appointment[] = [];
    notifications?: Notification[] = [];
    procedures?: Procedure[] = [];

    constructor(data: Patient) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.birthDate = data.birthDate;
        this.gender = data.gender;
        this.address = data.address;
        this.city = data.city;
        this.state = data.state;
        this.country = data.country;
        this.active = data.active;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.appointments = data.appointments;
        this.notifications = data.notifications;
        this.procedures = data.procedures;
    }
}