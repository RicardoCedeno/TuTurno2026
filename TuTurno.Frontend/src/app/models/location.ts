import { IOffice } from "./office";

export interface ILocation {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone?: string | null;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    offices?: IOffice[];
}