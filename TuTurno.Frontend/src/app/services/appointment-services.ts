import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { IAppointment } from '../models/appointment';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentServices {
  private apiServices = inject(ApiServices);

  // Obtiene todas las citas
  getAllAppointments(): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>('/appointments/getAllAppointments', { authenticated: false });
  }

  // Obtiene citas por Paciente
  getAppointmentsByPatient(patientId: string): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByPatient/${patientId}`, { authenticated: false });
  }

  // Obtiene citas por Rango de Fecha
  getAppointmentsByDateRange(start: string, end: string): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByDateRange?start=${start}&end=${end}`, { authenticated: false });
  }

  // Obtiene citas por Doctor
  getAppointmentsByDoctor(doctorId: string): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByDoctor/${doctorId}`, { authenticated: false });
  }

  // Obtiene citas por Doctor y Rango de Fecha
  getAppointmentsByDoctorAndDateRange(doctorId: string, start: string, end: string): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByDoctor/${doctorId}/range?start=${start}&end=${end}`, { authenticated: false });
  }

  // Obtiene citas por Estado
  getAppointmentsByStatus(status: 'scheduled' | 'completed' | 'cancelled'): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByStatus/${status}`, { authenticated: false });
  }

  // Obtiene citas por Paciente y Estado
  getAppointmentsByPatientAndStatus(patientId: string, status: string): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByPatient/${patientId}/status/${status}`, { authenticated: false });
  }

  // Obtiene citas por Paciente, Doctor y Estado
  getAppointmentsByPatientDoctorAndStatus(patientId: string, doctorId: string, status: string): Observable<IResponse<IAppointment[]>> {
    return this.apiServices.get<IResponse<IAppointment[]>>(`/appointments/getAppointmentsByPatient/${patientId}/doctor/${doctorId}/status/${status}`, { authenticated: false });
  }

  // Obtiene cita por ID
  getAppointmentById(id: string): Observable<IResponse<IAppointment>> {
    return this.apiServices.get<IResponse<IAppointment>>(`/appointments/getAppointmentById/${id}`, { authenticated: false });
  }

  // Crea una nueva cita
  createAppointment(appointment: IAppointment): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>('/appointments/createAppointment', appointment, { authenticated: false });
  }

  // Actualiza una cita existente
  updateAppointment(appointment: IAppointment): Observable<IResponse<string[]>> {
    return this.apiServices.put<IResponse<string[]>>(`/appointments/updateAppointment/${appointment.id}`, appointment, { authenticated: false });
  }

  // Elimina una cita por su ID
  deleteAppointment(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/appointments/deleteAppointment/${id}`, { authenticated: false });
  }
}
