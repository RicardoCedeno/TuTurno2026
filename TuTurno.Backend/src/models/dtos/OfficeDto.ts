import { LocationDto } from "./LocationDto";

export interface OfficeDto {
    id: string;
    locationId: string;
    name: string;
    floor?: string | null;
    description?: string | null;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    location?: LocationDto;
}

