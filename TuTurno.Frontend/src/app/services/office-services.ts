import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { IOffice } from '../models/office';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfficeServices {
  private apiServices = inject(ApiServices);

  // Obtiene todas las oficinas
  getAllOffices(): Observable<IResponse<IOffice[]>> {
    return this.apiServices.get<IResponse<IOffice[]>>('/offices/getAllOffices', { authenticated: false });
  }

  // Obtiene las oficinas activas
  getActiveOffices(): Observable<IResponse<IOffice[]>> {
    return this.apiServices.get<IResponse<IOffice[]>>('/offices/getActiveOffices', { authenticated: false });
  }

  // Obtiene las oficinas inactivas
  getInactiveOffices(): Observable<IResponse<IOffice[]>> {
    return this.apiServices.get<IResponse<IOffice[]>>('/offices/getInactiveOffices', { authenticated: false });
  }

  // Obtiene oficinas por ID de ubicación
  getOfficesByLocation(locationId: string): Observable<IResponse<IOffice[]>> {
    return this.apiServices.get<IResponse<IOffice[]>>(`/offices/getOfficesByLocation/${locationId}`, { authenticated: false });
  }

  // Obtiene oficinas por piso
  getOfficesByFloor(floor: string): Observable<IResponse<IOffice[]>> {
    return this.apiServices.get<IResponse<IOffice[]>>(`/offices/getOfficesByFloor/${floor}`, { authenticated: false });
  }

  // Obtiene una oficina por su ID
  getOfficeById(id: string): Observable<IResponse<IOffice>> {
    return this.apiServices.get<IResponse<IOffice>>(`/offices/getOfficeById/${id}`, { authenticated: false });
  }

  // Crea una nueva oficina
  createOffice(office: IOffice): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>('/offices/createOffice', office, { authenticated: false });
  }

  // Actualiza una oficina existente
  updateOffice(office: IOffice): Observable<IResponse<string[]>> {
    return this.apiServices.put<IResponse<string[]>>(`/offices/updateOffice/${office.id}`, office, { authenticated: false });
  }

  // Elimina una oficina por su ID
  deleteOffice(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/offices/deleteOffice/${id}`, { authenticated: false });
  }
}
