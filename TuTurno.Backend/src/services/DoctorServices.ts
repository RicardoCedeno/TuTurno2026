import { DoctorRepository } from "../repositories/DoctorRepository";
import { Doctor } from "../models/entities/Doctor";
import { DoctorDto } from "../models/dtos/DoctorDto";
import { v4 as uuidv4 } from 'uuid';
import { DoctorSpecialtyRepository } from "../repositories/DoctorSpecialtyRepository";
import { DoctorMapper } from "../models/mappers/doctorMapper";

export class DoctorServices {
    private doctorRepository: DoctorRepository;
    private doctorSpecialtyRepository: DoctorSpecialtyRepository;
    constructor() {
        this.doctorRepository = new DoctorRepository();
        this.doctorSpecialtyRepository = new DoctorSpecialtyRepository();
    }

    async getAllDoctors(): Promise<Doctor[]> {
        const doctors = await this.doctorRepository.findAll();
        return doctors.map(doctor => DoctorMapper.toDto(doctor));
    }
    async getDoctorById(id: string): Promise<DoctorDto> {
        if (!id) return {} as DoctorDto;
        const doctor = await this.doctorRepository.findById(id);
        if (!doctor) {
            return {} as DoctorDto;
        }
        return DoctorMapper.toDto(doctor);
    }

    async createDoctor(doctor: DoctorDto): Promise<string[]> {
        if (!doctor) return ["el doctor no existe"];
        if (!doctor.name || !doctor.email || !doctor.phone || !doctor.address || !doctor.city || !doctor.state || !doctor.country) {
            return ["nombre, email, teléfono, dirección, ciudad, estado y país son requeridos"];
        }
        const doctorEntity = DoctorMapper.toEntity({ ...doctor, id: uuidv4() });
        try {
            const existingDoctor = await this.doctorRepository.findById(doctorEntity.id);
            if (existingDoctor) {
                return ["ya existe un doctor con el mismo id"];
            }
            await this.doctorRepository.create(doctorEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear el doctor"];
        }
    }

    async updateDoctor(doctor: DoctorDto): Promise<string[]> {
        if (!doctor) return ["el doctor no existe"];
        if (!doctor.name || !doctor.email || !doctor.phone || !doctor.address || !doctor.city || !doctor.state || !doctor.country) return ["nombre, email, teléfono, dirección, ciudad, estado y país son requeridos"];
        const doctorEntity = DoctorMapper.toEntity(doctor);
        try {
            const existingDoctor = await this.doctorRepository.findById(doctorEntity.id);
            if (!existingDoctor) {
                return ["el doctor no existe"];
            }
            await this.doctorRepository.update(doctorEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al actualizar el doctor"];
        }
    }
    async deleteDoctor(id: string): Promise<string[]> {
        if (!id) return ["el doctor no existe"];
        try {
            await this.doctorRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar el doctor"];
        }
    }

    async getDoctorsBySpecialty(specialtyId: string): Promise<DoctorDto[]> {
        try {
            if (!specialtyId) return [];
            const doctors = await this.doctorRepository.findAll();
            if (!doctors) return [];
            const doctorsSpecialties = await this.doctorSpecialtyRepository.findBySpecialtyId(specialtyId);
            if (!doctorsSpecialties) return [];
            const filteredDoctors = doctors.filter(x => doctorsSpecialties.some(y => y.doctorId === x.id));
            return filteredDoctors.map(doctor => DoctorMapper.toDto(doctor));
        } catch (error) {
            // Si hay un error, devuelve un array vacío
            return [];
        }

    }
}