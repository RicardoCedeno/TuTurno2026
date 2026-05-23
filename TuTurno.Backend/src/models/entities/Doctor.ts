import { DoctorSpecialty } from "./DoctorSpecialty";
import { Procedure } from "./Procedure";

export class Doctor{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    createdAt?: Date;
    updatedAt?: Date;

    // ---------------------- Navegación ----------------------
    doctorsSpecialties?: DoctorSpecialty[] = [];
    procedures?: Procedure[] = [];



    constructor(data: Doctor) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.city = data.city;
        this.state = data.state;
        this.country = data.country;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.doctorsSpecialties = data.doctorsSpecialties;
        this.procedures = data.procedures;
    }
}