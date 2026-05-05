import { prisma } from "../lib/prisma";
import { Office } from "../models/entities/Office";

export class OfficeRepository {
    async findAll(): Promise<Office[]> {
        const offices = await prisma.office.findMany({
            include: {
                location: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return offices.map((office: any) => new Office(office));
    }

    async findActive(active: boolean): Promise<Office[]> {
        const offices = await prisma.office.findMany({
            where: { active },
            include: {
                location: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return offices.map((office: any) => new Office(office));
    }

    async findByLocationId(locationId: string): Promise<Office[]> {
        const offices = await prisma.office.findMany({
            where: { locationId },
            include: {
                location: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return offices.map((office: any) => new Office(office));
    }

    async findByFloor(floor: string): Promise<Office[]> {
        const offices = await prisma.office.findMany({
            where: { 
                floor: {
                    equals: floor,
                    mode: "insensitive"
                }
            },
            include: {
                location: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return offices.map((office: any) => new Office(office));
    }

    async findById(id: string): Promise<Office | null> {
        const office = await prisma.office.findUnique({
            where: { id },
            include: {
                location: true,
            },
        });

        return office ? new Office(office) : null;
    }

    async create(office: Office): Promise<Office> {
        try {
            const newOffice = await prisma.office.create({
                data: {
                    id: office.id,
                    locationId: office.locationId,
                    name: office.name,
                    floor: office.floor,
                    description: office.description,
                    active: office.active,
                },
                include: {
                    location: true,
                },
            });

            return new Office(newOffice);
        } catch (error) {
            throw new Error("Error al crear la oficina");
        }
    }

    async update(office: Office): Promise<Office> {
        try {
            const updatedOffice = await prisma.office.update({
                where: { id: office.id },
                data: {
                    locationId: office.locationId,
                    name: office.name,
                    floor: office.floor,
                    description: office.description,
                    active: office.active,
                },
                include: {
                    location: true,
                },
            });

            return new Office(updatedOffice);
        } catch (error) {
            throw new Error("Error al actualizar la oficina");
        }
    }

    async delete(id: string): Promise<void> {
        await prisma.office.delete({ where: { id } });
    }
}
