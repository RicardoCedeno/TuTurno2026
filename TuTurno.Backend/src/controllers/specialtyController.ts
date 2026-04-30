//controlador para specialty
import { Request, Response } from "express";
import { SpecialtyServices } from "../services/SpecialtyServices";
import { Specialty } from "../models/entities/Specialty";
import { ResponseDto } from "../models/dtos/responseDto";

export class SpecialtyController {
    private specialtyService: SpecialtyServices;

    constructor() {
        this.specialtyService = new SpecialtyServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<Specialty[]> = {
            success: true,
            errors: [],
            data: []
        }
        try {
            const specialties = await this.specialtyService.getAllSpecialties();
            response.data = specialties;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push('Ocurrió un error al obtener las especialidades. Código error: XXX');
            res.status(500).json(response);
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const specialty = await this.specialtyService.getSpecialtyById(id);
            res.status(200).json({ success: true, data: specialty });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        }
        try {
            const messages = await this.specialtyService.createSpecialty(req.body);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(201).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push('Ocurrió un error al crear la especialidad. Código error: XXX');
            res.status(500).json(response);
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        }
        try {
            const id = req.params.id;
            const messages = await this.specialtyService.updateSpecialty(req.body);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push('Ocurrió un error al actualizar la especialidad. Código error: XXX');
            res.status(500).json(response);
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        }
        try {
            const id = req.params.id;
            const messages = await this.specialtyService.deleteSpecialty(id);
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
            response.errors.push('Ocurrió un error al eliminar la especialidad. Código error: XXX');
            res.status(500).json(response);
        }
    }
}