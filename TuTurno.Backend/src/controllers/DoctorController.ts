import { Request, Response } from "express";
import { DoctorServices } from "../services/DoctorServices";
import { DoctorDto } from "../models/dtos/DoctorDto";
import { ResponseDto } from "../models/dtos/responseDto";

export class DoctorController {
    private doctorService: DoctorServices;

    constructor() {
        this.doctorService = new DoctorServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<DoctorDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctors = await this.doctorService.getAllDoctors();
            response.data = doctors;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los doctores. Código error: XXX");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<DoctorDto> = {
            success: true,
            errors: [],
            data: {} as DoctorDto
        };
        try {
            const id = req.params.id;
            const doctor = await this.doctorService.getDoctorById(id);
            response.data = doctor;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener el doctor. Código error: XXX");
            res.status(500).json(response);
        }
    };

    getBySpecialty = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<DoctorDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const specialtyId = req.params.specialtyId;
            const doctors = await this.doctorService.getDoctorsBySpecialty(specialtyId);
            response.data = doctors;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los doctores por especialidad. Código error: XXX");
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
            const messages = await this.doctorService.createDoctor(req.body);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(201).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear el doctor. Código error: XXX");
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
            const doctor: DoctorDto = { ...req.body, id: req.params.id };
            const messages = await this.doctorService.updateDoctor(doctor);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar el doctor. Código error: XXX");
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
            const messages = await this.doctorService.deleteDoctor(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                response.success = true;
                response.errors = messages;
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al eliminar el doctor. Código error: XXX");
            res.status(500).json(response);
        }
    };
}
