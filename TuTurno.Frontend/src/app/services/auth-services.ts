import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { IUser } from '../models/user';
import { ILoginResponse } from '../models/login-response';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private apiServices = inject(ApiServices);

  login(email: string, password: string): Observable<IResponse<ILoginResponse>> {
    return this.apiServices.post<IResponse<ILoginResponse>>(
      '/auth/login',
      { email, password },
      { authenticated: false }
    );
  }

  signup(user: IUser): Observable<IResponse<Omit<IUser, 'password'>>> {
    return this.apiServices.post<IResponse<Omit<IUser, 'password'>>>(
      '/auth/signup',
      user,
      { authenticated: false }
    );
  }
}
