import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/entities/User";
import { UserDto } from "../models/dtos/UserDto";
import { UserMapper } from "../models/mappers/userMapper";
import { Role } from "@prisma/client";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => UserMapper.toDto(user));
  }

  async getUsersByLocationId(locationId: string): Promise<UserDto[]> {
    if (!locationId) return [];
    const users = await this.userRepository.getUsersByLocationId(locationId);
    return users.map(user => UserMapper.toDto(user));
  }

  async getUserById(id: string): Promise<UserDto> {
    if (!id) return {} as UserDto;
    const user = await this.userRepository.findById(id);
    if (!user) {
      return {} as UserDto;
    }
    return UserMapper.toDto(user);
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    if (!email) return {} as UserDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return {} as UserDto;
    }
    return UserMapper.toDto(user);
  }

  async getUsersByLocationAndRole(locationId: string, role: Role): Promise<UserDto[]> {
    if (!locationId || !role) return [];
    const users = await this.userRepository.getUsersByLocationAndRole(locationId, role);
    return users.map(user => UserMapper.toDto(user));
  }

  async createUser(userDto: UserDto): Promise<string[]> {
    if (!userDto) return ["El usuario no es válido"];
    if (!userDto.name || !userDto.email || !userDto.locationId) {
      return ["Nombre, email y ubicación son requeridos"];
    }

    try {
      // Validar si el email ya existe
      const existingUser = await this.userRepository.findByEmail(userDto.email);
      if (existingUser) {
        return ["Ya existe un usuario con este correo electrónico"];
      }

      const userEntity = UserMapper.toEntity(userDto);
      await this.userRepository.create(userEntity);
      return [];
    } catch (error: any) {
      return [error.message || "Ocurrió un error al crear el usuario"];
    }
  }

  async updateUser(userDto: UserDto): Promise<string[]> {
    if (!userDto || !userDto.id) return ["El usuario no existe o el ID es inválido"];
    if (!userDto.name || !userDto.email || !userDto.locationId) {
      return ["Nombre, email y ubicación son requeridos"];
    }

    try {
      const existingUser = await this.userRepository.findById(userDto.id);
      if (!existingUser) {
        return ["El usuario no existe"];
      }

      const userEntity = UserMapper.toEntity(userDto);
      await this.userRepository.update(userEntity);
      return [];
    } catch (error: any) {
      return [error.message || "Ocurrió un error al actualizar el usuario"];
    }
  }

  async deleteUser(id: string): Promise<string[]> {
    if (!id) return ["El ID del usuario es requerido"];

    try {
      const existingUser = await this.userRepository.findById(id);
      if (!existingUser) {
        return ["El usuario no existe"];
      }

      await this.userRepository.delete(id);
      return [];
    } catch (error: any) {
      return [error.message || "Ocurrió un error al eliminar el usuario"];
    }
  }

  async deactivateUser(id: string): Promise<string[]> {
    if (!id) return ["El ID del usuario es requerido"];

    try {
      const existingUser = await this.userRepository.findById(id);
      if (!existingUser) {
        return ["El usuario no existe"];
      }

      existingUser.active = false;
      await this.userRepository.update(existingUser);
      return [];
    } catch (error: any) {
      return [error.message || "Ocurrió un error al desactivar el usuario"];
    }
  }
}
