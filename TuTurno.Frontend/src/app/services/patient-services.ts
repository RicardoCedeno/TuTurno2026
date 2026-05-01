import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServices } from './api-services';
import { IPatient } from '../models/patient';
import { IResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class PatientServices {
  private apiServices = inject(ApiServices);

  createPatient(patient: IPatient): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>('/patients/createPatient', patient, { authenticated: false });
  }
  getPatients(): Observable<IResponse<IPatient[]>> {
    return this.apiServices.get<IResponse<IPatient[]>>('/patients/getAllPatients', { authenticated: false });
  }
  updatePatient(patient: IPatient): Observable<IResponse<string[]>> {
    return this.apiServices.put<IResponse<string[]>>(`/patients/updatePatient/${patient.id}`, patient, { authenticated: false });
  }
  deletePatient(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/patients/deletePatient/${id}`, { authenticated: false });
  }
  getPatientById(id: string): Observable<IResponse<IPatient>> {
    return this.apiServices.get<IResponse<IPatient>>(`/patients/getPatientById/${id}`, { authenticated: false });
  }
}
