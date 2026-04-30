export class Office {
    id: string;
    locationId: string;
    name: string;
    floor?: string | null;
    description?: string | null;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Office) {
        this.id = data.id;
        this.locationId = data.locationId;
        this.name = data.name;
        this.floor = data.floor;
        this.description = data.description;
        this.active = data.active;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
