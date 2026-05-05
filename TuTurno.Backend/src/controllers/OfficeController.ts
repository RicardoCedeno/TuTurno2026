import { Request, Response } from "express";
import { OfficeServices } from "../services/OfficeServices";
import { OfficeDto } from "../models/dtos/OfficeDto";
import { ResponseDto } from "../models/dtos/responseDto";

export class OfficeController {
    private officeService: OfficeServices;

    constructor() {
        this.officeService = new OfficeServices();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<OfficeDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const offices = await this.officeService.getAllOffices();
            response.data = offices;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las oficinas.");
            res.status(500).json(response);
        }
    };

    getActive = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<OfficeDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const offices = await this.officeService.getActiveOffices(true);
            response.data = offices;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las oficinas activas.");
            res.status(500).json(response);
        }
    };

    getInactive = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<OfficeDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const offices = await this.officeService.getActiveOffices(false);
            response.data = offices;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las oficinas inactivas.");
            res.status(500).json(response);
        }
    };

    getByLocationId = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<OfficeDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const locationId = req.params.locationId;
            const offices = await this.officeService.getOfficesByLocationId(locationId);
            response.data = offices;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las oficinas por ubicación.");
            res.status(500).json(response);
        }
    };

    getByFloor = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<OfficeDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const floor = req.params.floor;
            const offices = await this.officeService.getOfficesByFloor(floor);
            response.data = offices;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener las oficinas por piso.");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<OfficeDto> = {
            success: true,
            errors: [],
            data: {} as OfficeDto
        };
        try {
            const id = req.params.id;
            const office = await this.officeService.getOfficeById(id);
            response.data = office;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener la oficina.");
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
            const messages = await this.officeService.createOffice(req.body);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(201).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear la oficina.");
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
            const officeDto: OfficeDto = { ...req.body, id: req.params.id };
            const messages = await this.officeService.updateOffice(officeDto);
            response.errors = messages;
            if (messages.length > 0) {
                response.success = false;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar la oficina.");
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
            const messages = await this.officeService.deleteOffice(id);
            if (messages.length > 0) {
                response.success = false;
                response.errors = messages;
                res.status(400).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al eliminar la oficina.");
            res.status(500).json(response);
        }
    };
}
