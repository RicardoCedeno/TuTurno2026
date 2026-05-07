import { DoctorUnavailabilityRepository } from "../repositories/DoctorUnavailabilityRepository";
import { DoctorUnavailabilityDto } from "../models/dtos/DoctorUnavailabilityDto";
import { DoctorUnavailabilityMapper } from "../models/mappers/doctorUnavailabilityMapper";
import { v4 as uuidv4 } from 'uuid';

export class DoctorUnavailabilityServices {
    private unavailabilityRepository: DoctorUnavailabilityRepository;

    constructor() {
        this.unavailabilityRepository = new DoctorUnavailabilityRepository();
    }

    async getByDoctorId(doctorId: string): Promise<DoctorUnavailabilityDto[]> {
        if (!doctorId) return [];
        const unavailabilities = await this.unavailabilityRepository.findByDoctorId(doctorId);
        return unavailabilities.map(u => DoctorUnavailabilityMapper.toDto(u));
    }

    async createUnavailability(dto: DoctorUnavailabilityDto): Promise<string[]> {
        if (!dto.doctorId || !dto.startDate || !dto.endDate) {
            return ["El doctor, fecha de inicio y fin son requeridos"];
        }

        if (new Date(dto.startDate) >= new Date(dto.endDate)) {
            return ["La fecha de inicio debe ser anterior a la fecha de fin"];
        }

        // Validar solapamiento
        const overlapping = await this.unavailabilityRepository.findOverlapping(
            dto.doctorId, 
            new Date(dto.startDate), 
            new Date(dto.endDate)
        );

        if (overlapping.length > 0) {
            return ["El periodo solicitado se solapa con un bloqueo de agenda existente"];
        }

        if (!dto.id) dto.id = uuidv4();

        try {
            const entity = DoctorUnavailabilityMapper.toEntity(dto);
            await this.unavailabilityRepository.create(entity);
            return [];
        } catch (error: any) {
            return [error.message || "Error al crear el bloqueo de agenda"];
        }
    }

    async createBulkUnavailability(dtos: DoctorUnavailabilityDto[]): Promise<string[]> {
        const allErrors: string[] = [];
        
        for (const dto of dtos) {
            const errors = await this.createUnavailability(dto);
            if (errors.length > 0) {
                const dateRange = `${new Date(dto.startDate).toLocaleDateString()} - ${new Date(dto.endDate).toLocaleDateString()}`;
                allErrors.push(`Error en bloqueo ${dateRange}: ${errors.join(", ")}`);
            }
        }
        
        return allErrors;
    }

    async deleteUnavailability(id: string): Promise<string[]> {
        if (!id) return ["El id es requerido"];
        try {
            await this.unavailabilityRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Error al eliminar el bloqueo de agenda"];
        }
    }

    // Método para verificar si un doctor está disponible en un momento específico
    async isDoctorAvailable(doctorId: string, date: Date, durationMinutes: number): Promise<boolean> {
        const start = new Date(date);
        const end = new Date(start.getTime() + durationMinutes * 60000);

        // 1. Verificar bloqueos (Unavailability)
        const overlapping = await this.unavailabilityRepository.findOverlapping(doctorId, start, end);
        if (overlapping.length > 0) return false;

        // 2. Verificar disponibilidad recurrente (Availability)
        // Necesitaremos acceso al repositorio de disponibilidad aquí o pasar la lógica a otro lugar.
        // Por simplicidad, este método se completará cuando integremos todo.
        return true; 
    }
}
