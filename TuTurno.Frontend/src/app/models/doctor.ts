import { DoctorSpecialtyDto } from "./doctorSpecialty";

export interface IDoctor {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    doctorSpecialties?: DoctorSpecialtyDto[];
}