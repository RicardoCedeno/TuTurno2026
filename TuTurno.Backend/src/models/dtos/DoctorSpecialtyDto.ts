import { SpecialtyDto } from "./SpecialtyDto";
import { DoctorDto } from "./DoctorDto";

//dto para la relación entre doctor y specialty
export default interface DoctorSpecialtyDto {
    id: string;
    doctorId: string;
    specialtyId: string;
    doctor?: DoctorDto;
    specialty?: SpecialtyDto;
}