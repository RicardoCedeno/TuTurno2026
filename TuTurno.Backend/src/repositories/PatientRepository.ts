import { prisma } from "../lib/prisma";
import { Patient } from "../models/entities/Patient";
import { PatientMapper } from "../models/mappers/patientMapper";

export class PatientRepository {
    async create(patient: Patient): Promise<Patient> {
        try {
            const newPatient = await prisma.patient.create({
                data: {
                    id: patient.id,
                    name: patient.name,
                    email: patient.email,
                    phone: patient.phone,
                    birthDate: patient.birthDate,
                    gender: patient.gender,
                    address: patient.address,
                    city: patient.city,
                    state: patient.state,
                    country: patient.country,
                    active: patient.active ?? true,
                },
                include: {
                    appointments: false,
                    notifications: false,
                },
            });

            return new Patient(newPatient);
        } catch (error) {
            throw new Error("Error al crear el paciente");
        }
    }

    async findAll(): Promise<Patient[]> {
        const patients = await prisma.patient.findMany({
            include: {
                appointments: true,
                notifications: false,
            },
        });

        return patients.map((patient) => new Patient(patient));
    }

    async findById(id: string): Promise<Patient | null> {
        const patient = await prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: {
                    include: {
                        notifications: false,
                    },
                },
                notifications: false,
            },
        });

        return patient ? new Patient(patient) : null;
    }

    async findByEmail(email: string): Promise<Patient | null> {
        const patient = await prisma.patient.findFirst({
            where: { email },
            include: {
                appointments: {
                    include: {
                        notifications: false,
                    },
                },
                notifications: false,
            },
        });

        return patient ? patient : null;
    }

    async update(patient: Patient): Promise<Patient> {
        const updatedPatient = await prisma.patient.update({
            where: { id: patient.id },
            data: {
                name: patient.name,
                email: patient.email,
                phone: patient.phone,
                birthDate: patient.birthDate,
                gender: patient.gender,
                address: patient.address,
                city: patient.city,
                state: patient.state,
                country: patient.country,
                active: patient.active,
            },
            include: {
                appointments: {
                    include: {
                        notifications: false,
                    },
                },
                notifications: false,
            },
        });

        return new Patient(updatedPatient);
    }

    async delete(id: string): Promise<void> {
        await prisma.patient.delete({ where: { id } });
    }
}
