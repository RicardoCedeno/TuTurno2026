import { prisma } from "../lib/prisma";
import { Appointment } from "../models/entities/Appointment";

export class AppointmentRepository {
    async create(appointment: Appointment): Promise<Appointment> {
        try {
            const newAppointment = await prisma.appointment.create({
                data: {
                    id: appointment.id,
                    patientId: appointment.patientId,
                    doctorId: appointment.doctorId,
                    officeId: appointment.officeId,
                    date: appointment.date,
                    duration: appointment.duration,
                    status: appointment.status,
                    notes: appointment.notes,
                },
                include: {
                    patient: true,
                    doctor: true,
                    office: true,
                },
            });

            return new Appointment(newAppointment as any);
        } catch (error) {
            throw new Error("Error al crear la cita");
        }
    }

    async findAll(): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findById(id: string): Promise<Appointment | null> {
        const appointment = await prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
        });

        return appointment ? new Appointment(appointment as any) : null;
    }

    async findByPatientId(patientId: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { patientId },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findByDoctorId(doctorId: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { doctorId },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findByDateRange(start: Date, end: Date): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: {
                date: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findByDoctorAndDateRange(doctorId: string, start: Date, end: Date): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                date: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findOverlapping(doctorId: string, start: Date, end: Date): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                status: { not: "cancelled" },
                OR: [
                    {
                        // La cita nueva empieza durante una cita existente
                        date: { lte: start },
                        // Usamos una aproximación ya que Prisma no puede calcular 'date + duration' directamente en el where
                        // Pero como las citas suelen ser cortas, podemos filtrar y luego refinar en el servicio
                    },
                    {
                        // La cita nueva termina durante una cita existente
                        date: { lte: end },
                    }
                ]
            }
        });

        // Refinamos el solapamiento en memoria para mayor precisión
        return appointments
            .map((app) => new Appointment(app as any))
            .filter(app => {
                const appStart = app.date.getTime();
                const appEnd = appStart + app.duration * 60000;
                const searchStart = start.getTime();
                const searchEnd = end.getTime();

                return (searchStart < appEnd && searchEnd > appStart);
            });
    }

    async findByStatus(status: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { status },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findByPatientAndStatus(patientId: string, status: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { patientId, status },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async findByPatientDoctorAndStatus(patientId: string, doctorId: string, status: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { patientId, doctorId, status },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
            orderBy: {
                date: "asc",
            },
        });

        return appointments.map((appointment) => new Appointment(appointment as any));
    }

    async update(appointment: Appointment): Promise<Appointment> {
        const updatedAppointment = await prisma.appointment.update({
            where: { id: appointment.id },
            data: {
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                officeId: appointment.officeId,
                date: appointment.date,
                duration: appointment.duration,
                status: appointment.status,
                notes: appointment.notes,
            },
            include: {
                patient: true,
                doctor: true,
                office: true,
            },
        });

        return new Appointment(updatedAppointment as any);
    }

    async delete(id: string): Promise<void> {
        await prisma.appointment.delete({ where: { id } });
    }
}
