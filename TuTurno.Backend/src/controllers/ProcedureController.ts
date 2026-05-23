import { Request, Response } from "express";
import { ProcedureServices } from "../services/ProcedureServices";
import { ProcedureDto } from '../models/dtos/ProcedureDto';
import { ResponseDto } from "../models/dtos/responseDto";

export class ProcedureController {
    private procedureService: ProcedureServices;

    constructor() {
        this.procedureService = new ProcedureServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<ProcedureDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const procedures = await this.procedureService.getAllProcedures();
            response.data = procedures;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los procedimientos.");
            res.status(500).json(response);
        }
    };

    getByPatient = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<ProcedureDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const patientId = req.params.patientId;
            const procedures = await this.procedureService.getProceduresByPatient(patientId);
            response.data = procedures;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los procedimientos del paciente.");
            res.status(500).json(response);
        }
    };

    getByDoctor = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<ProcedureDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctorId = req.params.doctorId;
            const procedures = await this.procedureService.getProceduresByDoctor(doctorId);
            response.data = procedures;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los procedimientos del doctor.");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<ProcedureDto | null> = {
            success: true,
            errors: [],
            data: null
        };
        try {
            const id = req.params.id;
            const procedure = await this.procedureService.getProcedureById(id);
            response.data = procedure;
            if (!procedure) {
                response.success = false;
                response.errors.push("El procedimiento no existe.");
                res.status(404).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener el procedimiento.");
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
            const messages = await this.procedureService.createProcedure(req.body);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear el procedimiento.");
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
            const dto: ProcedureDto = { ...req.body, id: req.params.id };
            const messages = await this.procedureService.updateProcedure(dto);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar el procedimiento.");
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
            const messages = await this.procedureService.deleteProcedure(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al eliminar el procedimiento.");
            res.status(500).json(response);
        }
    };
}
