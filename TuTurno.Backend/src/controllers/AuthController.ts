import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { UserDto } from "../models/dtos/UserDto";
import { ResponseDto } from "../models/dtos/responseDto";

interface LoginResponse {
  token: string;
  user: Omit<UserDto, "password">;
}

export class AuthController {
  private authService = AuthService;

  login = async (req: Request, res: Response): Promise<void> => {
    const response: ResponseDto<LoginResponse> = {
      success: true,
      errors: [],
      data: undefined,
    };

    try {
      const { email, password } = req.body;

      if (!email || !password) {
        response.success = false;
        response.errors.push("Email y contraseña son requeridos");
        res.status(400).json(response);
        return;
      }

      const loginData = await this.authService.login(email, password);
      response.data = loginData;
      res.status(200).json(response);
    } catch (error) {
      response.success = false;
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      response.errors.push(
        `Ocurrió un error al iniciar sesión: ${errorMessage}`
      );
      res.status(401).json(response);
    }
  };

  signup = async (req: Request, res: Response): Promise<void> => {
    const response: ResponseDto<Omit<UserDto, "password">> = {
      success: true,
      errors: [],
      data: undefined,
    };

    try {
      const userData: UserDto = req.body;
      userData.location = undefined

      const newUser = await this.authService.signUp(userData);
      response.data = newUser;
      res.status(201).json(response);
    } catch (error) {
      response.success = false;
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      response.errors.push(
        `Ocurrió un error al registrar el usuario: ${errorMessage}`
      );
      res.status(400).json(response);
    }
  };
}
