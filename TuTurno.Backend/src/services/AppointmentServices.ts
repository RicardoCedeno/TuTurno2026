import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentDto } from '../models/dtos/AppointmentDto';
import { AppointmentMapper } from "../models/mappers/appointmentMapper";
import { v4 as uuidv4 } from 'uuid';

export class AppointmentServices {
    private appointmentRepository: AppointmentRepository;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
    }

    async getAllAppointments(): Promise<AppointmentDto[]> {
        const appointments = await this.appointmentRepository.findAll();
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByPatient(patientId: string): Promise<AppointmentDto[]> {
        if (!patientId) return [];
        const appointments = await this.appointmentRepository.findByPatientId(patientId);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByDateRange(start: Date, end: Date): Promise<AppointmentDto[]> {
        if (!start || !end) return [];
        const appointments = await this.appointmentRepository.findByDateRange(start, end);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByDoctor(doctorId: string): Promise<AppointmentDto[]> {
        if (!doctorId) return [];
        const appointments = await this.appointmentRepository.findByDoctorId(doctorId);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByDoctorAndDateRange(doctorId: string, start: Date, end: Date): Promise<AppointmentDto[]> {
        if (!doctorId || !start || !end) return [];
        const appointments = await this.appointmentRepository.findByDoctorAndDateRange(doctorId, start, end);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByStatus(status: string): Promise<AppointmentDto[]> {
        if (!status) return [];
        const appointments = await this.appointmentRepository.findByStatus(status);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByPatientAndStatus(patientId: string, status: string): Promise<AppointmentDto[]> {
        if (!patientId || !status) return [];
        const appointments = await this.appointmentRepository.findByPatientAndStatus(patientId, status);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentsByPatientDoctorAndStatus(patientId: string, doctorId: string, status: string): Promise<AppointmentDto[]> {
        if (!patientId || !doctorId || !status) return [];
        const appointments = await this.appointmentRepository.findByPatientDoctorAndStatus(patientId, doctorId, status);
        return appointments.map(app => AppointmentMapper.toDto(app));
    }

    async getAppointmentById(id: string): Promise<AppointmentDto | null> {
        if (!id) return null;
        const appointment = await this.appointmentRepository.findById(id);
        return appointment ? AppointmentMapper.toDto(appointment) : null;
    }

    async createAppointment(dto: AppointmentDto): Promise<string[]> {
        if (!dto) return ["La cita no existe"];
        if (!dto.patientId || !dto.doctorId || !dto.officeId || !dto.date) {
            return ["El paciente, doctor, oficina y fecha son requeridos"];
        }

        if (!dto.id) {
            dto.id = uuidv4();
        }

        try {
            const appointmentEntity = AppointmentMapper.toEntity(dto);
            await this.appointmentRepository.create(appointmentEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear la cita"];
        }
    }

    async updateAppointment(dto: AppointmentDto): Promise<string[]> {
        if (!dto || !dto.id) return ["La cita o el id no existe"];
        if (!dto.patientId || !dto.doctorId || !dto.officeId || !dto.date) {
            return ["El paciente, doctor, oficina y fecha son requeridos"];
        }

        try {
            const existingAppointment = await this.appointmentRepository.findById(dto.id);
            if (!existingAppointment) {
                return ["La cita no existe"];
            }
            const appointmentEntity = AppointmentMapper.toEntity(dto);
            await this.appointmentRepository.update(appointmentEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al actualizar la cita"];
        }
    }

    async deleteAppointment(id: string): Promise<string[]> {
        if (!id) return ["El id de la cita es requerido"];
        try {
            const existingAppointment = await this.appointmentRepository.findById(id);
            if (!existingAppointment) {
                return ["La cita no existe"];
            }
            await this.appointmentRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar la cita"];
        }
    }
}
