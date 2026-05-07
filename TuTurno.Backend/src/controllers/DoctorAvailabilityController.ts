import { Request, Response } from "express";
import { DoctorAvailabilityServices } from "../services/DoctorAvailabilityServices";
import { ResponseDto } from "../models/dtos/responseDto";
import { DoctorAvailabilityDto } from "../models/dtos/DoctorAvailabilityDto";

export class DoctorAvailabilityController {
    private availabilityService: DoctorAvailabilityServices;

    constructor() {
        this.availabilityService = new DoctorAvailabilityServices();
    }

    getByDoctorId = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<DoctorAvailabilityDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctorId = req.params.doctorId;
            const availabilities = await this.availabilityService.getByDoctorId(doctorId);
            response.data = availabilities;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Error al obtener la disponibilidad del doctor");
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
            const messages = await this.availabilityService.createAvailability(req.body);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Error al crear la disponibilidad");
            res.status(500).json(response);
        }
    };

    createBulk = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const messages = await this.availabilityService.createBulkAvailability(req.body);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Error al procesar la creación masiva de disponibilidad");
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
            const messages = await this.availabilityService.deleteAvailability(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Error al eliminar la disponibilidad");
            res.status(500).json(response);
        }
    };
}
