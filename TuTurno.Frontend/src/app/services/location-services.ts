import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { ILocation } from '../models/location';
import { IResponse } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationServices {
  private apiServices = inject(ApiServices);

  // Obtiene todas las sedes
  getAllLocations(): Observable<IResponse<ILocation[]>> {
    return this.apiServices.get<IResponse<ILocation[]>>('/locations/getAllLocations', { authenticated: false });
  }

  // Obtiene las sedes activas
  getActiveLocations(): Observable<IResponse<ILocation[]>> {
    return this.apiServices.get<IResponse<ILocation[]>>('/locations/getActiveLocations', { authenticated: false });
  }

  // Obtiene las sedes inactivas
  getInactiveLocations(): Observable<IResponse<ILocation[]>> {
    return this.apiServices.get<IResponse<ILocation[]>>('/locations/getInactiveLocations', { authenticated: false });
  }

  // Obtiene sedes por ciudad
  getLocationsByCity(city: string): Observable<IResponse<ILocation[]>> {
    return this.apiServices.get<IResponse<ILocation[]>>(`/locations/getLocationsByCity/${city}`, { authenticated: false });
  }

  // Obtiene sedes por país
  getLocationsByCountry(country: string): Observable<IResponse<ILocation[]>> {
    return this.apiServices.get<IResponse<ILocation[]>>(`/locations/getLocationsByCountry/${country}`, { authenticated: false });
  }

  // Obtiene sedes por teléfono
  getLocationsByPhone(phone: string): Observable<IResponse<ILocation[]>> {
    return this.apiServices.get<IResponse<ILocation[]>>(`/locations/getLocationsByPhone/${phone}`, { authenticated: false });
  }

  // Obtiene una sede por su ID
  getLocationById(id: string): Observable<IResponse<ILocation | null>> {
    return this.apiServices.get<IResponse<ILocation | null>>(`/locations/getLocationById/${id}`, { authenticated: false });
  }

  // Crea una nueva sede
  createLocation(location: ILocation): Observable<IResponse<string[]>> {
    return this.apiServices.post<IResponse<string[]>>('/locations/createLocation', location, { authenticated: false });
  }

  // Actualiza una sede existente
  updateLocation(location: ILocation): Observable<IResponse<string[]>> {
    return this.apiServices.put<IResponse<string[]>>(`/locations/updateLocation/${location.id}`, location, { authenticated: false });
  }

  // Elimina una sede por su ID
  deleteLocation(id: string): Observable<IResponse<string[]>> {
    return this.apiServices.delete<IResponse<string[]>>(`/locations/deleteLocation/${id}`, { authenticated: false });
  }
}
