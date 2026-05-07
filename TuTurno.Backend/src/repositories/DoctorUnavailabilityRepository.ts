import { prisma } from "../lib/prisma";
import { DoctorUnavailability } from "../models/entities/DoctorUnavailability";

export class DoctorUnavailabilityRepository {
    async findByDoctorId(doctorId: string): Promise<DoctorUnavailability[]> {
        const unavailabilities = await prisma.doctorUnavailability.findMany({
            where: { doctorId },
            orderBy: { startDate: 'asc' }
        });
        return unavailabilities.map(u => new DoctorUnavailability(u));
    }

    async create(data: DoctorUnavailability): Promise<DoctorUnavailability> {
        const newUnavailability = await prisma.doctorUnavailability.create({
            data: {
                id: data.id || undefined,
                doctorId: data.doctorId,
                startDate: data.startDate,
                endDate: data.endDate,
                reason: data.reason
            }
        });
        return new DoctorUnavailability(newUnavailability);
    }

    async delete(id: string): Promise<void> {
        await prisma.doctorUnavailability.delete({
            where: { id }
        });
    }

    async findById(id: string): Promise<DoctorUnavailability | null> {
        const unavailability = await prisma.doctorUnavailability.findUnique({
            where: { id }
        });
        return unavailability ? new DoctorUnavailability(unavailability) : null;
    }

    async findOverlapping(doctorId: string, start: Date, end: Date): Promise<DoctorUnavailability[]> {
        const overlapping = await prisma.doctorUnavailability.findMany({
            where: {
                doctorId,
                OR: [
                    {
                        startDate: { lte: end },
                        endDate: { gte: start }
                    }
                ]
            }
        });
        return overlapping.map(u => new DoctorUnavailability(u));
    }
}
