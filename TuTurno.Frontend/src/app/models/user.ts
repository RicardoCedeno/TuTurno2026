import { ILocation } from "./location";

export interface IUser {
  id: string;
    name: string;
    email: string;
    phone?: string;
    role: "RECEPCIONIST";
    active: boolean;
    locationId: string;
    createdAt?: Date;
    updatedAt?: Date;
    location?: ILocation | null;
    password?: string;
}
