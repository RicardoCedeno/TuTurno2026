import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { IDoctor } from '../models/doctor';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorServices {
  private apiServices = inject(ApiServices);
  //crea un doctor
  createDoctor(doctor: IDoctor): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>('/doctors/createDoctor', doctor, { authenticated: true });
  }
  getDoctors(): Observable<IResponse<IDoctor[]>> {
    return this.apiServices.get<IResponse<IDoctor[]>>('/doctors/getAllDoctors', { authenticated: true });
  }
  getDoctorById(id: string): Observable<IResponse<IDoctor>> {
    return this.apiServices.get<IResponse<IDoctor>>(`/doctors/getDoctorById/${id}`, { authenticated: true });
  }
  updateDoctor(doctor: IDoctor): Observable<IResponse<string[]>> {
    return this.apiServices.put<IResponse<string[]>>(`/doctors/updateDoctor/${doctor.id}`, doctor, { authenticated: true });
  }
  deleteDoctor(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/doctors/deleteDoctor/${id}`, { authenticated: true });
  }
}
