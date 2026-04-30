import { LocationDto } from "../dtos/LocationDto";
import { Location } from "../entities/Location";
import { OfficeMapper } from "./officeMapper";

export class LocationMapper {
    static toDto(location: Location): LocationDto {
        return {
            id: location.id,
            name: location.name,
            address: location.address,
            city: location.city,
            state: location.state,
            country: location.country,
            phone: location.phone,
            active: location.active,
            createdAt: location.createdAt,
            updatedAt: location.updatedAt,
            offices: location.offices?.map((office) => OfficeMapper.toDto(office)),
        };
    }

    static toEntity(dto: LocationDto): Location {
        return {
            id: dto.id,
            name: dto.name,
            address: dto.address,
            city: dto.city,
            state: dto.state,
            country: dto.country,
            phone: dto.phone,
            active: dto.active,
            createdAt: new Date(),
            updatedAt: new Date(),
            offices: dto.offices?.map((office) => OfficeMapper.toEntity(office)),
        };
    }
}

