import { Component, inject, signal, OnInit } from '@angular/core';
import { LocationsList } from '../locations-list/locations-list';
import { LocationsForm } from '../locations-form/locations-form';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';
import { ILocation } from '../../models/location';
import { LocationServices } from '../../services/location-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [LocationsForm, LocationsList, CommonModule],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations implements OnInit {
  private locationServices = inject(LocationServices);
  locations = signal<ILocation[]>([]);
  loading = signal<boolean>(false);
  mode = signal<'list' | 'create' | 'update' | null>('list');
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<ILocation>);

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.loading.set(true);
    this.locationServices.getAllLocations().subscribe({
      next: (response) => {
        if (response.success) {
          this.locations.set(response.data);
        } else {
          this.alertsService.showErrorAlert(`Error al obtener sedes: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al obtener sedes: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onAddLocation() {
    this.dataServices.clearSelectedItem();
    this.mode.set('create');
  }

  createLocation(location: ILocation) {
    this.loading.set(true);
    this.locationServices.createLocation(location).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertsService.showSuccessAlert('Sede creada correctamente');
          this.mode.set('list');
          this.getLocations();
        } else {
          this.alertsService.showErrorAlert(`Error al crear la sede: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al crear la sede: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onCancel(mode: 'list' | 'create' | 'update') {
    this.mode.set(mode);
    if (mode === 'list') {
      this.dataServices.clearSelectedItem();
    }
  }

  deleteLocation(id: string) {
    this.alertsService.showQuestionAlert('¿Estás seguro de querer eliminar esta sede?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.locationServices.deleteLocation(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Sede eliminada correctamente');
              this.getLocations();
            } else {
              this.alertsService.showErrorAlert(`Error al eliminar la sede: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al eliminar la sede: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }

  onEditLocation(location: ILocation) {
    this.dataServices.setSelectedItem(location);
    this.mode.set('update');
  }

  updateLocation(location: ILocation) {
    this.alertsService.showQuestionAlert('¿Estás seguro de querer actualizar esta sede?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.locationServices.updateLocation(location).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Sede actualizada correctamente');
              this.mode.set('list');
              this.getLocations();
            } else {
              this.alertsService.showErrorAlert(`Error al actualizar la sede: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al actualizar la sede: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }
}
