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
  createDoctor(doctor: IDoctor): Observable<IResponse<IDoctor>> {
    return this.apiServices.post<IResponse<IDoctor>>('/doctors/createDoctor', doctor, { authenticated: false });
  }
  getDoctors(): Observable<IResponse<IDoctor[]>> {
    return this.apiServices.get<IResponse<IDoctor[]>>('/doctors/getAllDoctors', { authenticated: false });
  }
  getDoctorById(id: string): Observable<IResponse<IDoctor>> {
    return this.apiServices.get<IResponse<IDoctor>>(`/doctors/getDoctorById/${id}`, { authenticated: false });
  }
  updateDoctor(doctor: IDoctor): Observable<IResponse<IDoctor>> {
    return this.apiServices.put<IResponse<IDoctor>>('/doctors/updateDoctor', doctor, { authenticated: false });
  }
  deleteDoctor(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/doctors/deleteDoctor/${id}`, { authenticated: false });
  }
}