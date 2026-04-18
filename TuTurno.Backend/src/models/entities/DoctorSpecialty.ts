import { Doctor } from "./Doctor";
import { Specialty } from "./Specialty";

//clase intermedia entre doctor y specialty
export class DoctorSpecialty{
    id: string;
    doctorId: string;
    specialtyId: string;
    doctor?: Doctor; 
    specialty?: Specialty; 
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: DoctorSpecialty) {
        this.id = data.id;
        this.doctorId = data.doctorId;
        this.specialtyId = data.specialtyId;
        this.doctor = data.doctor;
        this.specialty = data.specialty;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}