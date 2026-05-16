import { UserDto } from "../dtos/UserDto";
import { User } from "../entities/User";

export class UserMapper {
    static toDto(user: User): UserDto {
        return {
            id: user.id || '',
            name: user.name,
            email: user.email,
            phone: user.phone || undefined,
            role: user.role,
            active: user.active,
            locationId: user.locationId || '',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            location: user.location,
            password: user.password
        };
    }

    static toEntity(dto: UserDto): User {
        return {
            id: dto.id,
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            role: dto.role,
            active: dto.active,
            locationId: dto.locationId,
            createdAt: dto.createdAt || new Date(),
            updatedAt: dto.updatedAt || new Date(),
            location: dto.location,
            password: dto.password
        } as User;
    }
}
