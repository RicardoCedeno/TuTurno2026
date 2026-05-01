import { prisma } from "../lib/prisma";
import { DoctorDto } from "../models/dtos/DoctorDto";
import { Doctor } from "../models/entities/Doctor";

//repositorio para doctors
export class DoctorRepository {
    async create(doctor: Doctor): Promise<Doctor> {
        try {
            const newDoctor = await prisma.doctor.create({
                data: {
                    id: doctor.id,
                    name: doctor.name,
                    email: doctor.email,
                    phone: doctor.phone,
                    address: doctor.address,
                    city: doctor.city,
                    state: doctor.state,
                    country: doctor.country,
                },
        include: {
            doctorsSpecialties: true,
        },
            });

            return new Doctor(newDoctor);
        } catch (error) {
            throw new Error("Error al crear el doctor");
        }
    }

    async findAll(): Promise<DoctorDto[]> {
        const doctors = await prisma.doctor.findMany({
            include: {
                doctorsSpecialties: {
                    include: {
                        doctor: true,
                        specialty: true,
                    },
                },
           
            },
        });

        return doctors.map((doctor: typeof doctors[number]) => new Doctor(doctor));
    }

    async findById(id: string): Promise<Doctor | null> {
        const doctor = await prisma.doctor.findUnique({
            where: { id },
            include: {
                doctorsSpecialties: true,
            },
        });

        return doctor ? new Doctor(doctor) : null;
    }

    async findByEmail(email: string): Promise<Doctor | null> {
        const doctor = await prisma.doctor.findFirst({
            where: { email },
            include: {
                doctorsSpecialties: true,
            },
        });

        return doctor ? new Doctor(doctor) : null;
    }

    async update(doctor: Doctor): Promise<Doctor> {
        const updatedDoctor = await prisma.doctor.update({
            where: { id: doctor.id },
            data: {
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                address: doctor.address,
                city: doctor.city,
                state: doctor.state,
                country: doctor.country,
            },
            include: {
                doctorsSpecialties: true,
            },
        });

        return new Doctor(updatedDoctor);
    }

    async delete(id: string): Promise<void> {
        await prisma.doctor.delete({ where: { id } });
    }
}
