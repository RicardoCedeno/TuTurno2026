import { Role } from "@prisma/client";
import { Location } from "./Location";

export class User {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  active: boolean;
  locationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  location?: Location;
  password?: string;


  constructor(data: {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    role?: Role;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    locationId?: string;
    password?: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role ?? Role.RECEPCIONIST;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.locationId = data.locationId;
    this.password = data.password;
  }
}
