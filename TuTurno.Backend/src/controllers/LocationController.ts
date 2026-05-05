import { Request, Response } from "express";
import { LocationServices } from "../services/LocationServices";
import { LocationDto } from "../models/dtos/LocationDto";
import { ResponseDto } from "../models/dtos/responseDto";

export class LocationController {
    private locationService: LocationServices;

    constructor() {
        this.locationService = new LocationServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const locations = await this.locationService.getAllLocations();
            response.data = locations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las sedes.");
            res.status(500).json(response);
        }
    };

    getByCity = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const city = req.params.city;
            const locations = await this.locationService.getLocationsByCity(city);
            response.data = locations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las sedes por ciudad.");
            res.status(500).json(response);
        }
    };

    getByCountry = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const country = req.params.country;
            const locations = await this.locationService.getLocationsByCountry(country);
            response.data = locations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las sedes por país.");
            res.status(500).json(response);
        }
    };

    getByPhone = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const phone = req.params.phone;
            const locations = await this.locationService.getLocationsByPhone(phone);
            response.data = locations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las sedes por teléfono.");
            res.status(500).json(response);
        }
    };

    getActive = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const locations = await this.locationService.getActiveLocations(true);
            response.data = locations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las sedes activas.");
            res.status(500).json(response);
        }
    };

    getInactive = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const locations = await this.locationService.getActiveLocations(false);
            response.data = locations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las sedes inactivas.");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<LocationDto | null> = {
            success: true,
            errors: [],
            data: null
        };
        try {
            const id = req.params.id;
            const location = await this.locationService.getLocationById(id);
            response.data = location;
            if (!location) {
                response.success = false;
                response.errors.push("La sede no existe.");
                res.status(404).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener la sede.");
            res.status(500).json(response);
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const messages = await this.locationService.createLocation(req.body);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear la sede.");
            res.status(500).json(response);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const locationDto: LocationDto = { ...req.body, id: req.params.id };
            const messages = await this.locationService.updateLocation(locationDto);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar la sede.");
            res.status(500).json(response);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const id = req.params.id;
            const messages = await this.locationService.deleteLocation(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al eliminar la sede.");
            res.status(500).json(response);
        }
    };
}
