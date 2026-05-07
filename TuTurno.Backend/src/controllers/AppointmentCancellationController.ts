import { Request, Response } from "express";
import { AppointmentCancellationServices } from "../services/AppointmentCancellationServices";
import { AppointmentCancellationDto } from "../models/dtos/AppointmentCancellationDto";
import { ResponseDto } from "../models/dtos/responseDto";

export class AppointmentCancellationController {
    private cancellationService: AppointmentCancellationServices;

    constructor() {
        this.cancellationService = new AppointmentCancellationServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentCancellationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const cancellations = await this.cancellationService.getAllCancellations();
            response.data = cancellations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las cancelaciones.");
            res.status(500).json(response);
        }
    };

    getByPatient = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentCancellationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const patientId = req.params.patientId;
            const cancellations = await this.cancellationService.getCancellationsByPatient(patientId);
            response.data = cancellations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las cancelaciones del paciente.");
            res.status(500).json(response);
        }
    };

    getByDoctor = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentCancellationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctorId = req.params.doctorId;
            const cancellations = await this.cancellationService.getCancellationsByDoctor(doctorId);
            response.data = cancellations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las cancelaciones del doctor.");
            res.status(500).json(response);
        }
    };

    getByDateRange = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentCancellationDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const start = new Date(req.query.start as string);
            const end = new Date(req.query.end as string);
            const cancellations = await this.cancellationService.getCancellationsByDateRange(start, end);
            response.data = cancellations;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las cancelaciones por rango de fecha.");
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
            const messages = await this.cancellationService.createCancellation(req.body);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear la cancelación.");
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
            const messages = await this.cancellationService.deleteCancellation(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al eliminar la cancelación.");
            res.status(500).json(response);
        }
    };
}
