import { OfficeRepository } from "../repositories/OfficeRepository";
import { OfficeDto } from "../models/dtos/OfficeDto";
import { OfficeMapper } from "../models/mappers/officeMapper";
import { v4 as uuidv4 } from 'uuid';

export class OfficeServices {
    private officeRepository: OfficeRepository;

    constructor() {
        this.officeRepository = new OfficeRepository();
    }

    async getAllOffices(): Promise<OfficeDto[]> {
        const offices = await this.officeRepository.findAll();
        return offices.map(office => OfficeMapper.toDto(office));
    }

    async getActiveOffices(active: boolean): Promise<OfficeDto[]> {
        const offices = await this.officeRepository.findActive(active);
        return offices.map(office => OfficeMapper.toDto(office));
    }

    async getOfficesByLocationId(locationId: string): Promise<OfficeDto[]> {
        if (!locationId) return [];
        const offices = await this.officeRepository.findByLocationId(locationId);
        return offices.map(office => OfficeMapper.toDto(office));
    }

    async getOfficesByFloor(floor: string): Promise<OfficeDto[]> {
        if (!floor) return [];
        const offices = await this.officeRepository.findByFloor(floor);
        return offices.map(office => OfficeMapper.toDto(office));
    }

    async getOfficeById(id: string): Promise<OfficeDto> {
        if (!id) return {} as OfficeDto;
        const office = await this.officeRepository.findById(id);
        if (!office) {
            return {} as OfficeDto;
        }
        return OfficeMapper.toDto(office);
    }

    async createOffice(officeDto: OfficeDto): Promise<string[]> {
        if (!officeDto) return ["La oficina no existe"];
        if (!officeDto.locationId || !officeDto.name) {
            return ["El id de ubicación y el nombre son requeridos"];
        }

        if (!officeDto.id) {
            officeDto.id = uuidv4();
        }

        const officeEntity = OfficeMapper.toEntity(officeDto);
        try {
            const existingOffice = await this.officeRepository.findById(officeEntity.id);
            if (existingOffice) {
                return ["Ya existe una oficina con el mismo id"];
            }
            await this.officeRepository.create(officeEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al crear la oficina"];
        }
    }

    async updateOffice(officeDto: OfficeDto): Promise<string[]> {
        if (!officeDto || !officeDto.id) return ["La oficina o el id no existe"];
        if (!officeDto.locationId || !officeDto.name) {
            return ["El id de ubicación y el nombre son requeridos"];
        }

        const officeEntity = OfficeMapper.toEntity(officeDto);
        try {
            const existingOffice = await this.officeRepository.findById(officeEntity.id);
            if (!existingOffice) {
                return ["La oficina no existe"];
            }
            await this.officeRepository.update(officeEntity);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al actualizar la oficina"];
        }
    }

    async deleteOffice(id: string): Promise<string[]> {
        if (!id) return ["El id de la oficina es requerido"];
        try {
            const existingOffice = await this.officeRepository.findById(id);
            if (!existingOffice) {
                return ["La oficina no existe"];
            }
            await this.officeRepository.delete(id);
            return [];
        } catch (error: any) {
            return [error.message || "Ocurrió un error al eliminar la oficina"];
        }
    }
}
