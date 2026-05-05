import { prisma } from "../lib/prisma";
import { LocationDto } from "../models/dtos/LocationDto";
import { Location } from "../models/entities/Location";
import { LocationMapper } from "../models/mappers/locationMapper";

export class LocationRepository {
    async findAll(): Promise<LocationDto[]> {
        const locations = await prisma.location.findMany({
            include: {
                offices: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return locations.map((location: typeof locations[number]) => LocationMapper.toDto(new Location(location)));
    }

    async findById(id: string): Promise<LocationDto | null> {
        const location = await prisma.location.findUnique({
            where: { id },
            include: {
                offices: true,
            },
        });

        return location ? LocationMapper.toDto(new Location(location)) : null;
    }

    async findByName(name: string): Promise<LocationDto | null> {
        const location = await prisma.location.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
            include: {
                offices: true,
            },
        });

        return location ? LocationMapper.toDto(new Location(location)) : null;
    }

    async findByCity(city: string): Promise<LocationDto[]> {
        const locations = await prisma.location.findMany({
            where: {
                city: {
                    equals: city,
                    mode: "insensitive",
                },
            },
            include: {
                offices: true,
            },
        });

        return locations.map((location: any) => LocationMapper.toDto(new Location(location)));
    }

    async findByCountry(country: string): Promise<LocationDto[]> {
        const locations = await prisma.location.findMany({
            where: {
                country: {
                    equals: country,
                    mode: "insensitive",
                },
            },
            include: {
                offices: true,
            },
        });

        return locations.map((location: any) => LocationMapper.toDto(new Location(location)));
    }

    async findByPhone(phone: string): Promise<LocationDto[]> {
        const locations = await prisma.location.findMany({
            where: {
                phone: {
                    contains: phone,
                },
            },
            include: {
                offices: true,
            },
        });

        return locations.map((location: any) => LocationMapper.toDto(new Location(location)));
    }

    async findByStatus(active: boolean): Promise<LocationDto[]> {
        const locations = await prisma.location.findMany({
            where: {
                active: active,
            },
            include: {
                offices: true,
            },
        });

        return locations.map((location: any) => LocationMapper.toDto(new Location(location)));
    }

    async create(location: LocationDto): Promise<LocationDto> {
        try {
            const newLocation = await prisma.location.create({
                data: {
                    name: location.name,
                    address: location.address,
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    phone: location.phone,
                    active: location.active,
                },
                include: {
                    offices: true,
                },
            });

            return LocationMapper.toDto(new Location(newLocation));
        } catch (error) {
            throw new Error("Error al crear la sede");
        }
    }

    async update(id: string, location: LocationDto): Promise<LocationDto> {
        const updatedLocation = await prisma.location.update({
            where: { id },
            data: {
                name: location.name,
                address: location.address,
                city: location.city,
                state: location.state,
                country: location.country,
                phone: location.phone,
                active: location.active,
            },
            include: {
                offices: true,
            },
        });

        return LocationMapper.toDto(new Location(updatedLocation));
    }

    async delete(id: string): Promise<void> {
        await prisma.location.delete({ where: { id } });
    }
}
