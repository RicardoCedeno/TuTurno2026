import { prisma } from "../lib/prisma";
import { DoctorSpecialty } from "../models/entities/DoctorSpecialty";

//repositorio para la relación doctor-especialidad
export class DoctorSpecialtyRepository {
    async create(doctorSpecialty: DoctorSpecialty): Promise<DoctorSpecialty> {
        try {
            const created = await prisma.doctorsSpecialties.create({
                data: {
                    doctorId: doctorSpecialty.doctorId,
                    specialtyId: doctorSpecialty.specialtyId,
                },
            });

            return new DoctorSpecialty({
                id: created.id,
                doctorId: created.doctorId,
                specialtyId: created.specialtyId,
            });
        } catch (error) {
            throw new Error("Error al crear la relación doctor-especialidad");
        }
    }

    async findAll(): Promise<DoctorSpecialty[]> {
        const relations = await prisma.doctorsSpecialties.findMany({
            include: {
                doctor: true,
                specialty: true,
            },
        });

        return relations.map((relation: typeof relations[number]) => new DoctorSpecialty(relation));
    }

    async findById(id: string): Promise<DoctorSpecialty | null> {
        const relation = await prisma.doctorsSpecialties.findUnique({
            where: { id },
            include: {
                doctor: true,
                specialty: true,
            },
        });

        return relation ? new DoctorSpecialty(relation) : null;
    }

    async findByDoctorId(doctorId: string): Promise<DoctorSpecialty[]> {
        const relations = await prisma.doctorsSpecialties.findMany({
            where: { doctorId },
            include: {
                doctor: true,
                specialty: true,
            },
        });

        return relations.map((relation: typeof relations[number]) => new DoctorSpecialty(relation));
    }

    async findBySpecialtyId(specialtyId: string): Promise<DoctorSpecialty[]> {
        const relations = await prisma.doctorsSpecialties.findMany({
            where: { specialtyId },
            include: {
                doctor: true,
                specialty: true,
            },
        });

        return relations.map((relation: typeof relations[number]) => new DoctorSpecialty(relation));
    }

    async delete(id: string): Promise<void> {
        await prisma.doctorsSpecialties.delete({ where: { id } });
    }
}
