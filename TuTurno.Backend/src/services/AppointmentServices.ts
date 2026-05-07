import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentDto } from '../models/dtos/AppointmentDto';
import { AppointmentMapper } from "../models/mappers/appointmentMapper";
import { v4 as uuidv4 } from 'uuid';
import { AppointmentCancellationServices } from "./AppointmentCancellationServices";
import { DoctorAvailabilityServices } from "./DoctorAvailabilityServices";
import { DoctorUnavailabilityServices } from "./DoctorUnavailabilityServices";

export class AppointmentServices {
    private cancellationServices: AppointmentCancellationServices;
    private availabilityServices: DoctorAvailabilityServices;
    private unavailabilityServices: DoctorUnavailabilityServices;
    private appointmentRepository: AppointmentRepository;
    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.cancellationServices = new AppointmentCancellationServices();
        this.availabilityServices = new DoctorAvailabilityServices();
        this.unavailabilityServices = new DoctorUnavailabilityServices();
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
            const appointmentDate = new Date(dto.date);
            const duration = dto.duration || 30;

            // 1. Validar Disponibilidad Recurrente
            const isWithinAvailability = await this.availabilityServices.isTimeWithinAvailability(dto.doctorId, appointmentDate, duration);
            if (!isWithinAvailability) {
                return ["El doctor no tiene disponibilidad configurada para este horario"];
            }

            // 2. Validar Bloqueos de Agenda
            const isAvailable = await this.unavailabilityServices.isDoctorAvailable(dto.doctorId, appointmentDate, duration);
            if (!isAvailable) {
                return ["El horario se encuentra bloqueado por el doctor"];
            }

            // 3. Validar Solapamiento con otras citas
            const appointmentEnd = new Date(appointmentDate.getTime() + duration * 60000);
            const overlaps = await this.appointmentRepository.findOverlapping(dto.doctorId, appointmentDate, appointmentEnd);
            if (overlaps.length > 0) {
                return ["Ya existe otra cita agendada en este horario"];
            }

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

            if (dto.status !== "cancelled") {
                await this.cancellationServices.deleteCancellationByAppointment(dto.id);
            }

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
