import { DoctorSpecialty } from "./DoctorSpecialty";

export class Specialty {
    id: string;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;

    // ---------------------- Navegación ----------------------
    doctorsSpecialties?: DoctorSpecialty[] = [];

    constructor(data: Specialty) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.doctorsSpecialties = data.doctorsSpecialties;
    }
}