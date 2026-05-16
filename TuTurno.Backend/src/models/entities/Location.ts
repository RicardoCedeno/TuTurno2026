import { Office } from "./Office";
import { User } from "./User";

export class Location {
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
    users?: User[] = [];



    // ---------------------- Navegación ----------------------
    offices?: Office[] = [];

    constructor(data: Location) {
        this.id = data.id;
        this.name = data.name;
        this.address = data.address;
        this.city = data.city;
        this.state = data.state;
        this.country = data.country;
        this.phone = data.phone;
        this.active = data.active;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.offices = data.offices;
    }
}
