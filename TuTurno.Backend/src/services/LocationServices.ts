import { LocationRepository } from "../repositories/LocationRepository";
import { LocationDto } from "../models/dtos/LocationDto";
import { LocationMapper } from "../models/mappers/locationMapper";
import { v4 as uuidv4 } from 'uuid';

export class LocationServices {
    private locationRepository: LocationRepository;

    constructor() {
        this.locationRepository = new LocationRepository();
    }

    async getAllLocations(): Promise<LocationDto[]> {
        return await this.locationRepository.findAll();
    }

    async getLocationsByCity(city: string): Promise<LocationDto[]> {
        if (!city) return [];
        return await this.locationRepository.findByCity(city);
    }

    async getLocationsByCountry(country: string): Promise<LocationDto[]> {
        if (!country) return [];
        return await this.locationRepository.findByCountry(country);
    }

    async getLocationsByPhone(phone: string): Promise<LocationDto[]> {
        if (!phone) return [];
        return await this.locationRepository.findByPhone(phone);
    }

    async getActiveLocations(active: boolean): Promise<LocationDto[]> {
        return await this.locationRepository.findByStatus(active);
    }

    async getLocationById(id: string): Promise<LocationDto | null> {
        if (!id) return null;
        return await this.locationRepository.findById(id);
    }

    async createLocation(locationDto: LocationDto): Promise<string[]> {
        if (!locationDto) return ["La sede no existe"];
        if (!locationDto.name || !locationDto.address || !locationDto.city || !locationDto.country) {
            return ["El nombre, dirección, ciudad y país son requeridos"];
        }

        if (!locationDto.id) {
            locationDto.id = uuidv4();
        }

        try {
            const existingLocation = await this.locationRepository.findByName(locationDto.name);
            if (existingLocation) {
                return ["Ya existe una sede con el mismo nombre"];
            }
            await this.locationRepository.create(locationDto);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear la sede"];
        }
    }

    async updateLocation(locationDto: LocationDto): Promise<string[]> {
        if (!locationDto || !locationDto.id) return ["La sede o el id no existe"];
        if (!locationDto.name || !locationDto.address || !locationDto.city || !locationDto.country) {
            return ["El nombre, dirección, ciudad y país son requeridos"];
        }

        try {
            const existingLocation = await this.locationRepository.findById(locationDto.id);
            if (!existingLocation) {
                return ["La sede no existe"];
            }
            await this.locationRepository.update(locationDto.id, locationDto);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al actualizar la sede"];
        }
    }

    async deleteLocation(id: string): Promise<string[]> {
        if (!id) return ["El id de la sede es requerido"];
        try {
            const existingLocation = await this.locationRepository.findById(id);
            if (!existingLocation) {
                return ["La sede no existe"];
            }
            await this.locationRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar la sede"];
        }
    }
}
