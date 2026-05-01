import { DoctorSpecialtyDto } from "./doctorSpecialty";

export interface ISpecialty {
  id: string;
  name: string;
  description: string;
  doctorSpecialties?: DoctorSpecialtyDto[];
}