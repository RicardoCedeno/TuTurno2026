import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { IProcedure } from '../models/procedure';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  })
export class ProcedureServices {
  private apiServices = inject(ApiServices);

  // Obtiene todos los procedimientos
  getAllProcedures(): Observable<IResponse<IProcedure[]>> {
    return this.apiServices.get<IResponse<IProcedure[]>>('/procedures/getAllProcedures', { authenticated: false });
  }

  // Obtiene procedimientos por Paciente
  getProceduresByPatient(patientId: string): Observable<IResponse<IProcedure[]>> {
    return this.apiServices.get<IResponse<IProcedure[]>>(`/procedures/getProceduresByPatient/${patientId}`, { authenticated: false });
  }

  // Obtiene procedimientos por ID de Paciente
  getProceduresByPatientId(patientId: string): Observable<IResponse<IProcedure[]>> {
    return this.apiServices.get<IResponse<IProcedure[]>>(`/procedures/getProceduresByPatientId/${patientId}`, { authenticated: false });
  }

  // Obtiene procedimientos por Doctor
  getProceduresByDoctor(doctorId: string): Observable<IResponse<IProcedure[]>> {
    return this.apiServices.get<IResponse<IProcedure[]>>(`/procedures/getProceduresByDoctor/${doctorId}`, { authenticated: false });
  }

  // Obtiene procedimientos por ID de Doctor
  getProceduresByDoctorId(doctorId: string): Observable<IResponse<IProcedure[]>> {
    return this.apiServices.get<IResponse<IProcedure[]>>(`/procedures/getProceduresByDoctorId/${doctorId}`, { authenticated: false });
  }

  // Obtiene procedimiento por ID
  getProceduresById(id: string): Observable<IResponse<IProcedure | null>> {
    return this.apiServices.get<IResponse<IProcedure | null>>(`/procedures/getProceduresById/${id}`, { authenticated: false });
  }

  // Agrega un nuevo procedimiento
  addProcedure(procedure: IProcedure): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>('/procedures/addProcedure', procedure, { authenticated: false });
  }

  // Actualiza un procedimiento existente
  updateProcedure(id: string, procedure: IProcedure): Observable<IResponse<string[]>> {
    return this.apiServices.put<IResponse<string[]>>(`/procedures/updateProcedure/${id}`, procedure, { authenticated: false });
  }

  // Elimina un procedimiento por su ID
  deleteProcedure(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/procedures/deleteProcedure/${id}`, { authenticated: false });
  }
}
