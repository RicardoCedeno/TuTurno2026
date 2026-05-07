import { prisma } from "../lib/prisma";
import { DoctorAvailability } from "../models/entities/DoctorAvailability";

export class DoctorAvailabilityRepository {
    async findByDoctorId(doctorId: string): Promise<DoctorAvailability[]> {
        const availabilities = await prisma.doctorAvailability.findMany({
            where: { doctorId }
        });
        return availabilities.map(a => new DoctorAvailability(a));
    }

    async create(data: DoctorAvailability): Promise<DoctorAvailability> {
        const newAvailability = await prisma.doctorAvailability.create({
            data: {
                id: data.id || undefined,
                doctorId: data.doctorId,
                dayOfWeek: data.dayOfWeek,
                startTime: data.startTime,
                endTime: data.endTime
            }
        });
        return new DoctorAvailability(newAvailability);
    }

    async update(data: DoctorAvailability): Promise<DoctorAvailability> {
        const updated = await prisma.doctorAvailability.update({
            where: { id: data.id },
            data: {
                dayOfWeek: data.dayOfWeek,
                startTime: data.startTime,
                endTime: data.endTime
            }
        });
        return new DoctorAvailability(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.doctorAvailability.delete({
            where: { id }
        });
    }

    async findById(id: string): Promise<DoctorAvailability | null> {
        const availability = await prisma.doctorAvailability.findUnique({
            where: { id }
        });
        return availability ? new DoctorAvailability(availability) : null;
    }
}
