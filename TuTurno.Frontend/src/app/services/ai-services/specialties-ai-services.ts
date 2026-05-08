import { inject, Injectable } from '@angular/core';
import { ApiServices } from '../api-services';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/response';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesAiServices {
  private apiServices = inject(ApiServices);

  generateSpecialtyDescription(name: string): Observable<IResponse<string>> {
    return this.apiServices.post<IResponse<string>>('/ai/specialties/generate-specialty-description', { name }, { authenticated: false });
  }
}
