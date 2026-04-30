//repositorio para specialty
import { prisma } from "../lib/prisma";
import { Specialty } from "../models/entities/Specialty";

export class SpecialtyRepository {
    private specialties: Specialty[] = [];

    async create(specialty: Specialty): Promise<Specialty> {
        try{
            const newSpecialty = await prisma.specialty.create({
                data: specialty
            });
            return new Specialty(newSpecialty);
        }catch(error){
            throw new Error("Error al crear la especialización");
        }
    }

    async findAll(): Promise<Specialty[]> {
        const specialties = await prisma.specialty.findMany({
            include: {
                doctors: true
            }
        });
        return specialties.map((s: typeof specialties[number]) => new Specialty(s));
    }

    async findById(id: string): Promise<Specialty | null> {
        //find the specialty by id
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: id
            }
        });
        return specialty ? new Specialty(specialty) : null; 
    }
    async findByName(name: string): Promise<Specialty | null> {
        const specialty = await prisma.specialty.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        });
        return specialty ? new Specialty(specialty) : null;
    }
    async update(specialty: Specialty): Promise<Specialty> {
        
        const updatedSpecialty = await prisma.specialty.update({
            where: { id: specialty.id },
            data: {
                name: specialty.name,
                description: specialty.description
            }
        });
        return new Specialty(updatedSpecialty);
    }
    async delete(id: string): Promise<void> {
        await prisma.specialty.delete({ where: { id: id } });
    }

}   