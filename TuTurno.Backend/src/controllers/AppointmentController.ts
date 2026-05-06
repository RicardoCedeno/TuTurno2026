import { Request, Response } from "express";
import { AppointmentServices } from "../services/AppointmentServices";
import { AppointmentDto } from '../models/dtos/AppointmentDto';
import { ResponseDto } from "../models/dtos/responseDto";

export class AppointmentController {
    private appointmentService: AppointmentServices;

    constructor() {
        this.appointmentService = new AppointmentServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const appointments = await this.appointmentService.getAllAppointments();
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas.");
            res.status(500).json(response);
        }
    };

    getByPatient = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const patientId = req.params.patientId;
            const appointments = await this.appointmentService.getAppointmentsByPatient(patientId);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas del paciente.");
            res.status(500).json(response);
        }
    };

    getByDateRange = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const start = new Date(req.query.start as string);
            const end = new Date(req.query.end as string);
            const appointments = await this.appointmentService.getAppointmentsByDateRange(start, end);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas por rango de fecha.");
            res.status(500).json(response);
        }
    };

    getByDoctor = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctorId = req.params.doctorId;
            const appointments = await this.appointmentService.getAppointmentsByDoctor(doctorId);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas del doctor.");
            res.status(500).json(response);
        }
    };

    getByDoctorAndDateRange = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const doctorId = req.params.doctorId;
            const start = new Date(req.query.start as string);
            const end = new Date(req.query.end as string);
            const appointments = await this.appointmentService.getAppointmentsByDoctorAndDateRange(doctorId, start, end);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas del doctor en el rango de fecha.");
            res.status(500).json(response);
        }
    };

    getByStatus = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const status = req.params.status;
            const appointments = await this.appointmentService.getAppointmentsByStatus(status);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas por estado.");
            res.status(500).json(response);
        }
    };

    getByPatientAndStatus = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const { patientId, status } = req.params;
            const appointments = await this.appointmentService.getAppointmentsByPatientAndStatus(patientId, status);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas del paciente por estado.");
            res.status(500).json(response);
        }
    };

    getByPatientDoctorAndStatus = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const { patientId, doctorId, status } = req.params;
            const appointments = await this.appointmentService.getAppointmentsByPatientDoctorAndStatus(patientId, doctorId, status);
            response.data = appointments;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las citas por paciente, doctor y estado.");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<AppointmentDto | null> = {
            success: true,
            errors: [],
            data: null
        };
        try {
            const id = req.params.id;
            const appointment = await this.appointmentService.getAppointmentById(id);
            response.data = appointment;
            if (!appointment) {
                response.success = false;
                response.errors.push("La cita no existe.");
                res.status(404).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener la cita.");
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
            const messages = await this.appointmentService.createAppointment(req.body);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear la cita.");
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
            const dto: AppointmentDto = { ...req.body, id: req.params.id };
            const messages = await this.appointmentService.updateAppointment(dto);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar la cita.");
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
            const messages = await this.appointmentService.deleteAppointment(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al eliminar la cita.");
            res.status(500).json(response);
        }
    };
}
