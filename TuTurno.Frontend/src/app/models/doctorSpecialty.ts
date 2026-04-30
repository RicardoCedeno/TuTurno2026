import { IDoctor } from "./doctor";
import { ISpecialty } from "./specialty";

export interface DoctorSpecialtyDto {
    id: string;
    doctorId: string;
    specialtyId: string;
    doctor?: IDoctor;
    specialty?: ISpecialty;
}