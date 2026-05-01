import { Request, Response } from "express";
import { PatientServices } from "../services/PatientServices";
import { PatientDto } from "../models/dtos/PatientDto";
import { ResponseDto } from "../models/dtos/responseDto";

export class PatientController {
    private patientService: PatientServices;

    constructor() {
        this.patientService = new PatientServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<PatientDto[]> = {
            success: true,
            errors: [],
            data: [],
        };

        try {
            const patients = await this.patientService.getAllPatients();
            response.data = patients;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los pacientes. Código error: XXX");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<PatientDto> = {
            success: true,
            errors: [],
            data: {} as PatientDto,
        };

        try {
            const id = req.params.id;
            const patient = await this.patientService.getPatientById(id);
            response.data = patient;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener el paciente. Código error: XXX");
            res.status(500).json(response);
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: [],
        };

        try {
            const messages = await this.patientService.createPatient(req.body);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(201).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear el paciente. Código error: XXX");
            res.status(500).json(response);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: [],
        };

        try {
            const patient: PatientDto = { ...req.body, id: req.params.id };
            const messages = await this.patientService.updatePatient(patient);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar el paciente. Código error: XXX");
            res.status(500).json(response);
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: [],
        };

        try {
            const id = req.params.id;
            const messages = await this.patientService.deletePatient(id);
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
            response.errors.push("Ocurrió un error al eliminar el paciente. Código error: XXX");
            res.status(500).json(response);
        }
    };
}
