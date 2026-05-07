import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { AlertsService } from './alerts-service';
import { IDoctorAvailability } from '../models/doctorAvailability';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorAvailabilityServices {
  private apiServices = inject(ApiServices);
  private alertsService = inject(AlertsService);

  private readonly basePath = '/doctor-availability';

  // Obtiene la disponibilidad recurrente de un doctor
  getAvailabilityByDoctor(doctorId: string): Observable<IResponse<IDoctorAvailability[]>> {
    return this.apiServices.get<IResponse<IDoctorAvailability[]>>(`${this.basePath}/doctor/${doctorId}`, { authenticated: false });
  }

  // Crea un nuevo slot de disponibilidad
  createAvailabilitySlot(slot: IDoctorAvailability): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>(`${this.basePath}`, slot, { authenticated: false });
  }

  // Registra múltiples slots de disponibilidad en una sola solicitud
  registerBulkAvailability(slots: IDoctorAvailability[]): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>(`${this.basePath}/bulk`, slots, { authenticated: false });
  }

  // Elimina un slot de disponibilidad por su ID
  deleteAvailabilitySlot(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`${this.basePath}/${id}`, { authenticated: false });
  }
}
