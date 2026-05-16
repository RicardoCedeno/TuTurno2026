import { Role } from "@prisma/client";
import { LocationDto } from "./LocationDto";

//crea la clase UserDto basado en User
export interface UserDto {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: Role;
    active: boolean;
    locationId: string;
    createdAt?: Date;
    updatedAt?: Date;
    location?: LocationDto;
    password?: string;
}