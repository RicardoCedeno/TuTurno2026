import { ILocation } from "./location";

export interface IOffice {
    id: string;
    locationId: string;
    name: string;
    floor?: string | null;
    description?: string | null;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    location?: ILocation;
}
