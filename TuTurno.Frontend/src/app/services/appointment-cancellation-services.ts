import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { AlertsService } from './alerts-service';
import { IAppointmentCancellation } from '../models/appointmentCancellation';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentCancellationServices {
  private apiServices = inject(ApiServices);
  private alertsService = inject(AlertsService);

  private readonly basePath = '/appointment-cancellations';

  // Obtiene todas las cancelaciones
  getAllCancellations(): Observable<IResponse<IAppointmentCancellation[]>> {
    return this.apiServices.get<IResponse<IAppointmentCancellation[]>>(`${this.basePath}/getAllCancellations`, { authenticated: false });
  }

  // Obtiene cancelaciones por Paciente
  getCancellationsByPatient(patientId: string): Observable<IResponse<IAppointmentCancellation[]>> {
    return this.apiServices.get<IResponse<IAppointmentCancellation[]>>(`${this.basePath}/getCancellationsByPatient/${patientId}`, { authenticated: false });
  }

  // Obtiene cancelaciones por Doctor
  getCancellationsByDoctor(doctorId: string): Observable<IResponse<IAppointmentCancellation[]>> {
    return this.apiServices.get<IResponse<IAppointmentCancellation[]>>(`${this.basePath}/getCancellationsByDoctor/${doctorId}`, { authenticated: false });
  }

  // Obtiene cancelaciones por Rango de Fechas
  getCancellationsByDateRange(start: string, end: string): Observable<IResponse<IAppointmentCancellation[]>> {
    return this.apiServices.get<IResponse<IAppointmentCancellation[]>>(`${this.basePath}/getCancellationsByDateRange?start=${start}&end=${end}`, { authenticated: false });
  }

  // Crea una nueva cancelación
  createCancellation(cancellation: Partial<IAppointmentCancellation>): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>(`${this.basePath}/createCancellation`, cancellation, { authenticated: false });
  }

  // Elimina una cancelación por su ID
  deleteCancellation(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`${this.basePath}/deleteCancellation/${id}`, { authenticated: false });
  }
}
