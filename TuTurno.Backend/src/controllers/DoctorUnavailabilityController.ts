import { Request, Response } from "express";
import { DoctorUnavailabilityServices } from "../services/DoctorUnavailabilityServices";
import { ResponseDto } from "../models/dtos/responseDto";
import { DoctorUnavailabilityDto } from "../models/dtos/DoctorUnavailabilityDto";

export class DoctorUnavailabilityController {
    private unavailabilityService: DoctorUnavailabilityServices;

    constructor() {
        this.unavailabilityService = new DoctorUnavailabilityServices();
    }

    getByDoctorId = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<DoctorUnavailabilityDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctorId = req.params.doctorId;
            const unavailabilities = await this.unavailabilityService.getByDoctorId(doctorId);
            response.data = unavailabilities;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Error al obtener los bloqueos de agenda del doctor");
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
            const messages = await this.unavailabilityService.createUnavailability(req.body);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Error al crear el bloqueo de agenda");
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
            const messages = await this.unavailabilityService.createBulkUnavailability(req.body);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Error al procesar la creación masiva de bloqueos");
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
            const messages = await this.unavailabilityService.deleteUnavailability(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Error al eliminar el bloqueo de agenda");
            res.status(500).json(response);
        }
    };
}
