import { prisma } from "../lib/prisma";
import { AppointmentCancellation } from "../models/entities/AppointmentCancellation";

export class AppointmentCancellationRepository {
    async create(cancellation: AppointmentCancellation): Promise<AppointmentCancellation> {
        try {
            const newCancellation = await prisma.appointmentCancellation.create({
                data: {
                    id: cancellation.id,
                    appointmentId: cancellation.appointmentId,
                    cancelledBy: cancellation.cancelledBy,
                    reason: cancellation.reason,
                    cancelledAt: cancellation.cancelledAt || new Date(),
                },
                include: {
                    appointment: {
                        include: {
                            patient: true,
                            doctor: true,
                            office: true,
                        },
                    },
                },
            });

            return new AppointmentCancellation(newCancellation as any);
        } catch (error) {
            throw new Error("Error al crear la cancelación de la cita");
        }
    }

    async findAll(): Promise<AppointmentCancellation[]> {
        const cancellations = await prisma.appointmentCancellation.findMany({
            include: {
                appointment: {
                    include: {
                        patient: true,
                        doctor: true,
                        office: true,
                    },
                },
            },
            orderBy: {
                cancelledAt: "desc",
            },
        });

        return cancellations.map((c) => new AppointmentCancellation(c as any));
    }

    async findById(id: string): Promise<AppointmentCancellation | null> {
        const cancellation = await prisma.appointmentCancellation.findUnique({
            where: { id },
            include: {
                appointment: {
                    include: {
                        patient: true,
                        doctor: true,
                        office: true,
                    },
                },
            },
        });

        return cancellation ? new AppointmentCancellation(cancellation as any) : null;
    }

    async findByAppointmentId(appointmentId: string): Promise<AppointmentCancellation | null> {
        const cancellation = await prisma.appointmentCancellation.findUnique({
            where: { appointmentId },
            include: {
                appointment: {
                    include: {
                        patient: true,
                        doctor: true,
                        office: true,
                    },
                },
            },
        });

        return cancellation ? new AppointmentCancellation(cancellation as any) : null;
    }

    async findByPatientId(patientId: string): Promise<AppointmentCancellation[]> {
        const cancellations = await prisma.appointmentCancellation.findMany({
            where: {
                appointment: {
                    patientId: patientId,
                },
            },
            include: {
                appointment: {
                    include: {
                        patient: true,
                        doctor: true,
                        office: true,
                    },
                },
            },
            orderBy: {
                cancelledAt: "desc",
            },
        });

        return cancellations.map((c) => new AppointmentCancellation(c as any));
    }

    async findByDoctorId(doctorId: string): Promise<AppointmentCancellation[]> {
        const cancellations = await prisma.appointmentCancellation.findMany({
            where: {
                appointment: {
                    doctorId: doctorId,
                },
            },
            include: {
                appointment: {
                    include: {
                        patient: true,
                        doctor: true,
                        office: true,
                    },
                },
            },
            orderBy: {
                cancelledAt: "desc",
            },
        });

        return cancellations.map((c) => new AppointmentCancellation(c as any));
    }

    async findByDateRange(start: Date, end: Date): Promise<AppointmentCancellation[]> {
        const cancellations = await prisma.appointmentCancellation.findMany({
            where: {
                cancelledAt: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                appointment: {
                    include: {
                        patient: true,
                        doctor: true,
                        office: true,
                    },
                },
            },
            orderBy: {
                cancelledAt: "asc",
            },
        });

        return cancellations.map((c) => new AppointmentCancellation(c as any));
    }

    async delete(id: string): Promise<void> {
        await prisma.appointmentCancellation.delete({ where: { id } });
    }

    async deleteByAppointmentId(appointmentId: string): Promise<void> {
        await prisma.appointmentCancellation.deleteMany({ where: { appointmentId } });
    }
}
