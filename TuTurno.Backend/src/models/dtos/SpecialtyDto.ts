
import DoctorSpecialtyDto from "./DoctorSpecialtyDto";
export interface SpecialtyDto {
    id: string;
    name: string;
    description: string;
    doctorsSpecialties?: DoctorSpecialtyDto[];
}