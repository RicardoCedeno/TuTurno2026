
import DoctorSpecialtyDto from "./DoctorSpecialtyDto";
import { ProcedureDto } from "./ProcedureDto";

//dto para el doctor
export interface DoctorDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    doctorsSpecialties?: DoctorSpecialtyDto[];
    procedures?: ProcedureDto[];
}