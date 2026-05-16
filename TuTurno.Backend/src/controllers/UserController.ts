import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserDto } from "../models/dtos/UserDto";
import { ResponseDto } from "../models/dtos/responseDto";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<UserDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const users = await this.userService.getAllUsers();
            response.data = users;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los usuarios.");
            res.status(500).json(response);
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<UserDto> = {
            success: true,
            errors: [],
            data: {} as UserDto
        };
        try {
            const id = req.params.id;
            const user = await this.userService.getUserById(id);
            response.data = user;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener el usuario.");
            res.status(500).json(response);
        }
    };

    getByLocation = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<UserDto[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const locationId = req.params.locationId;
            const users = await this.userService.getUsersByLocationId(locationId);
            response.data = users;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al obtener los usuarios por ubicación.");
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
            const messages = await this.userService.createUser(req.body);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(201).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al crear el usuario.");
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
            const user: UserDto = { ...req.body, id: req.params.id };
            const messages = await this.userService.updateUser(user);
            response.errors = messages;
            if (messages.length > 0) response.success = false;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.errors.push("Ocurrió un error al actualizar el usuario.");
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
            const messages = await this.userService.deleteUser(id);
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
            response.errors.push("Ocurrió un error al eliminar el usuario.");
            res.status(500).json(response);
        }
    };

    deactivate = async (req: Request, res: Response): Promise<void> => {
        const response: ResponseDto<string[]> = {
            success: true,
            errors: [],
            data: []
        };

        try {
            const id = req.params.id;
            const messages = await this.userService.deactivateUser(id);
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
            response.errors.push("Ocurrió un error al desactivar el usuario.");
            res.status(500).json(response);
        }
    };
}
