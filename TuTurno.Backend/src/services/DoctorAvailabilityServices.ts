import { DoctorAvailabilityRepository } from "../repositories/DoctorAvailabilityRepository";
import { DoctorAvailabilityDto } from "../models/dtos/DoctorAvailabilityDto";
import { DoctorAvailabilityMapper } from "../models/mappers/doctorAvailabilityMapper";
import { v4 as uuidv4 } from 'uuid';

export class DoctorAvailabilityServices {
    private availabilityRepository: DoctorAvailabilityRepository;

    constructor() {
        this.availabilityRepository = new DoctorAvailabilityRepository();
    }

    async getByDoctorId(doctorId: string): Promise<DoctorAvailabilityDto[]> {
        if (!doctorId) return [];
        const availabilities = await this.availabilityRepository.findByDoctorId(doctorId);
        return availabilities.map(a => DoctorAvailabilityMapper.toDto(a));
    }

    async createAvailability(dto: DoctorAvailabilityDto): Promise<string[]> {
        if (!dto.doctorId || dto.dayOfWeek === undefined || !dto.startTime || !dto.endTime) {
            return ["El doctor, día de la semana, hora de inicio y fin son requeridos"];
        }

        // Validar que startTime < endTime
        if (dto.startTime >= dto.endTime) {
            return ["La hora de inicio debe ser menor a la hora de fin"];
        }

        // Validar solapamiento en el mismo día
        const existing = await this.availabilityRepository.findByDoctorId(dto.doctorId);
        const dayConflict = existing.some(a => 
            a.dayOfWeek === dto.dayOfWeek && 
            ((dto.startTime >= a.startTime && dto.startTime < a.endTime) ||
             (dto.endTime > a.startTime && dto.endTime <= a.endTime) ||
             (dto.startTime <= a.startTime && dto.endTime >= a.endTime))
        );

        if (dayConflict) {
            return ["Ya existe una franja horaria que se solapa con la nueva para este día"];
        }

        if (!dto.id) dto.id = uuidv4();

        try {
            const entity = DoctorAvailabilityMapper.toEntity(dto);
            await this.availabilityRepository.create(entity);
            return [];
        } catch (error: any) {
            return [error.message || "Error al crear la disponibilidad"];
        }
    }

    async createBulkAvailability(dtos: DoctorAvailabilityDto[]): Promise<string[]> {
        const allErrors: string[] = [];
        
        for (const dto of dtos) {
            const errors = await this.createAvailability(dto);
            if (errors.length > 0) {
                const dayName = this.getDayName(dto.dayOfWeek);
                allErrors.push(`Error en franja ${dayName} ${dto.startTime}-${dto.endTime}: ${errors.join(", ")}`);
            }
        }
        
        return allErrors;
    }

    private getDayName(day: number): string {
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return days[day] || `Día ${day}`;
    }

    async deleteAvailability(id: string): Promise<string[]> {
        if (!id) return ["El id es requerido"];
        try {
            await this.availabilityRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Error al eliminar la disponibilidad"];
        }
    }

    async isTimeWithinAvailability(doctorId: string, date: Date, durationMinutes: number): Promise<boolean> {
        const dayOfWeek = date.getDay();
        const timeStr = date.toTimeString().split(' ')[0].substring(0, 5); // "HH:mm"
        
        const end = new Date(date.getTime() + durationMinutes * 60000);
        const endTimeStr = end.toTimeString().split(' ')[0].substring(0, 5);

        const availabilities = await this.availabilityRepository.findByDoctorId(doctorId);
        
        // El doctor debe tener al menos una franja que cubra TODO el periodo de la cita
        return availabilities.some(a => 
            a.dayOfWeek === dayOfWeek && 
            timeStr >= a.startTime && 
            endTimeStr <= a.endTime
        );
    }
}
