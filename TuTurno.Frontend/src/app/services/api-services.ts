import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  //genera peticion get, contiene como parametro la url, el header y si es necesario estar autenticado. La autenticacion es por token
  get<T>(
    url: string,
    options: {
      headers?: HttpHeaders;
      authenticated?: boolean;
    } = {}
  ): Observable<T> {
  
    let headers = options.headers ?? new HttpHeaders();
  
    if (options.authenticated) {
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    }
  
    return this.http.get<T>(`${this.apiUrl}${url}`, { headers });
  }
  //genera peticion post, contiene como parametro la url, el body y si es necesario estar autenticado. La autenticacion es por token
  post<T>(
    url: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      authenticated?: boolean;
    } = {}
  ): Observable<T> {
    let headers = options.headers ?? new HttpHeaders();
    if (options.authenticated) {
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    }
    return this.http.post<T>(`${this.apiUrl}${url}`, body, { headers }) as Observable<T>;
  }
  //genera peticion put, contiene como parametro la url, el body y si es necesario estar autenticado. La autenticacion es por token
  put<T>(
    url: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      authenticated?: boolean;
    } = {}
  ): Observable<T> {
    let headers = options.headers ?? new HttpHeaders();
    if (options.authenticated) {
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    }
    return this.http.put<T>(`${this.apiUrl}${url}`, body, { headers }) as Observable<T>;
  }
  //genera peticion delete, contiene como parametro la url y si es necesario estar autenticado. La autenticacion es por token
  delete<T>(
    url: string,
    options: {
      headers?: HttpHeaders;
      authenticated?: boolean;
    } = {}
  ): Observable<T> {
    let headers = options.headers ?? new HttpHeaders();
    if (options.authenticated) {
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    }
    return this.http.delete<T>(`${this.apiUrl}${url}`, { headers }) as Observable<T>;
  }
}
