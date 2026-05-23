import { prisma } from "../lib/prisma";
import { Procedure } from "../models/entities/Procedure";

export class ProcedureRepository {
    async create(procedure: Procedure): Promise<Procedure> {
        try {
            const newProcedure = await prisma.procedure.create({
                data: {
                    id: procedure.id,
                    patientId: procedure.patientId,
                    doctorId: procedure.doctorId,
                    name: procedure.name,
                    description: procedure.description,
                    totalSessions: procedure.totalSessions,
                    totalPrice: procedure.totalPrice,
                    status: procedure.status,
                    startDate: procedure.startDate,
                    endDate: procedure.endDate,
                },
                include: {
                    patient: true,
                    doctor: true,
                },
            });

            return new Procedure(newProcedure as any);
        } catch (error) {
            throw new Error("Error al crear el procedimiento");
        }
    }

    async findAll(): Promise<Procedure[]> {
        const procedures = await prisma.procedure.findMany({
            include: {
                patient: true,
                doctor: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return procedures.map((proc) => new Procedure(proc as any));
    }

    async findById(id: string): Promise<Procedure | null> {
        const procedure = await prisma.procedure.findUnique({
            where: { id },
            include: {
                patient: true,
                doctor: true,
                appointments: true,
                payments: true,
            },
        });

        return procedure ? new Procedure(procedure as any) : null;
    }

    async findByPatientId(patientId: string): Promise<Procedure[]> {
        const procedures = await prisma.procedure.findMany({
            where: { patientId },
            include: {
                patient: true,
                doctor: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return procedures.map((proc) => new Procedure(proc as any));
    }

    async findByDoctorId(doctorId: string): Promise<Procedure[]> {
        const procedures = await prisma.procedure.findMany({
            where: { doctorId },
            include: {
                patient: true,
                doctor: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return procedures.map((proc) => new Procedure(proc as any));
    }

    async update(procedure: Procedure): Promise<Procedure> {
        const updatedProcedure = await prisma.procedure.update({
            where: { id: procedure.id },
            data: {
                patientId: procedure.patientId,
                doctorId: procedure.doctorId,
                name: procedure.name,
                description: procedure.description,
                totalSessions: procedure.totalSessions,
                totalPrice: procedure.totalPrice,
                status: procedure.status,
                startDate: procedure.startDate,
                endDate: procedure.endDate,
            },
            include: {
                patient: true,
                doctor: true,
            },
        });

        return new Procedure(updatedProcedure as any);
    }

    async delete(id: string): Promise<void> {
        await prisma.procedure.delete({ where: { id } });
    }
}
