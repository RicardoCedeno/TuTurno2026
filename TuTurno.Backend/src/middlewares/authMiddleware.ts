import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { ResponseDto } from "../models/dtos/responseDto";

/**
 * Middleware to protect routes and verify JWT
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const response: ResponseDto<null> = {
    success: false,
    errors: [],
    data: null
  };

  try {
    // 1. Get token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } 
    // 2. Alternatively, get from cookies if implemented (req.cookies.token)
    else if (req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((res, c) => {
        const [key, val] = c.trim().split('=');
        res[key] = val;
        return res;
      }, {} as Record<string, string>);
      token = cookies['token'];
    }

    if (!token) {
      response.errors.push("No se proporcionó un token de autenticación");
      res.status(401).json(response);
      return;
    }

    // 3. Verify token
    const payload = AuthService.verifyToken(token);

    // 4. Inject user data into Request object
    req.user = {
      id: payload.id,
      role: payload.role
    };

    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Token inválido o expirado";
    response.errors.push(message);
    res.status(401).json(response);
  }
};
