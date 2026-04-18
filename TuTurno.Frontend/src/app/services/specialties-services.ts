import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { Observable } from 'rxjs';
import { ISpecialty } from '../models/specialty';
import { IResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesServices {
  private apiServices = inject(ApiServices);
  //obtiene todas las especialidades
  getSpecialties(): Observable<IResponse<ISpecialty[]>> {
    return this.apiServices.get<IResponse<ISpecialty[]>>('/specialties/getAllSpecialties', { authenticated: false })
  }
  createSpecialty(specialty: ISpecialty): Observable<IResponse<ISpecialty>> {
    return this.apiServices.post<IResponse<ISpecialty>>('/specialties/createSpecialty', specialty, { authenticated: false })
  }
}
