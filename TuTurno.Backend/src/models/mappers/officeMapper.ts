import { OfficeDto } from "../dtos/OfficeDto";
import { Office } from "../entities/Office";

export class OfficeMapper {
    static toDto(office: Office): OfficeDto {
        return {
            id: office.id,
            locationId: office.locationId,
            name: office.name,
            floor: office.floor,
            description: office.description,
            active: office.active,
            createdAt: office.createdAt,
            updatedAt: office.updatedAt,
        };
    }

    static toEntity(dto: OfficeDto): Office {
        return {
            id: dto.id,
            locationId: dto.locationId,
            name: dto.name,
            floor: dto.floor,
            description: dto.description,
            active: dto.active,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

