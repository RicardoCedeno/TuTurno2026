import { AppointmentCancellationRepository } from "../repositories/AppointmentCancellationRepository";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentCancellationDto } from "../models/dtos/AppointmentCancellationDto";
import { AppointmentCancellationMapper } from "../models/mappers/appointmentCancellationMapper";
import { v4 as uuidv4 } from 'uuid';

export class AppointmentCancellationServices {
    private cancellationRepository: AppointmentCancellationRepository;
    private appointmentRepository: AppointmentRepository;

    constructor() {
        this.cancellationRepository = new AppointmentCancellationRepository();
        this.appointmentRepository = new AppointmentRepository();
    }

    async getAllCancellations(): Promise<AppointmentCancellationDto[]> {
        const cancellations = await this.cancellationRepository.findAll();
        return cancellations.map(c => AppointmentCancellationMapper.toDto(c));
    }

    async getCancellationsByPatient(patientId: string): Promise<AppointmentCancellationDto[]> {
        if (!patientId) return [];
        const cancellations = await this.cancellationRepository.findByPatientId(patientId);
        return cancellations.map(c => AppointmentCancellationMapper.toDto(c));
    }

    async getCancellationsByDoctor(doctorId: string): Promise<AppointmentCancellationDto[]> {
        if (!doctorId) return [];
        const cancellations = await this.cancellationRepository.findByDoctorId(doctorId);
        return cancellations.map(c => AppointmentCancellationMapper.toDto(c));
    }

    async getCancellationsByDateRange(start: Date, end: Date): Promise<AppointmentCancellationDto[]> {
        if (!start || !end) return [];
        const cancellations = await this.cancellationRepository.findByDateRange(start, end);
        return cancellations.map(c => AppointmentCancellationMapper.toDto(c));
    }

    async createCancellation(dto: AppointmentCancellationDto): Promise<string[]> {
        if (!dto) return ["La cancelación no existe"];
        if (!dto.appointmentId || !dto.cancelledBy) {
            return ["El id de la cita y quién cancela son requeridos"];
        }

        try {
            // Verificar si la cita existe
            const appointment = await this.appointmentRepository.findById(dto.appointmentId);
            if (!appointment) {
                return ["La cita no existe"];
            }

            // Verificar si ya está cancelada
            const existingCancellation = await this.cancellationRepository.findByAppointmentId(dto.appointmentId);
            if (existingCancellation) {
                return ["La cita ya ha sido cancelada anteriormente"];
            }

            if (!dto.id) {
                dto.id = uuidv4();
            }

            const cancellationEntity = AppointmentCancellationMapper.toEntity(dto);
            await this.cancellationRepository.create(cancellationEntity);

            // Actualizar el estado de la cita
            appointment.status = "cancelled";
            await this.appointmentRepository.update(appointment);

            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear la cancelación"];
        }
    }

    async deleteCancellation(id: string): Promise<string[]> {
        if (!id) return ["El id de la cancelación es requerido"];
        try {
            const existingCancellation = await this.cancellationRepository.findById(id);
            if (!existingCancellation) {
                return ["La cancelación no existe"];
            }
            await this.cancellationRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar la cancelación"];
        }
    }

    async deleteCancellationByAppointment(appointmentId: string): Promise<string[]> {
        if (!appointmentId) return ["El id de la cita es requerido"];
        try {
            await this.cancellationRepository.deleteByAppointmentId(appointmentId);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar la cancelación por cita"];
        }
    }
}
