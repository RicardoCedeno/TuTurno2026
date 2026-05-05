import { Component, inject, signal, OnInit } from '@angular/core';
import { OfficesList } from '../offices-list/offices-list';
import { CommonModule } from '@angular/common';
import { OfficesForm } from '../offices-form/offices-form';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';
import { IOffice } from '../../models/office';
import { OfficeServices } from '../../services/office-services';
import { LocationServices } from '../../services/location-services';
import { ILocation } from '../../models/location';


@Component({
  selector: 'app-offices',
  imports: [OfficesList, CommonModule, OfficesForm],
  templateUrl: './offices.html',
  styleUrl: './offices.css',
  standalone: true,
})
export class Offices implements OnInit {
  private officeServices = inject(OfficeServices);
  private locationServices = inject(LocationServices);
  offices = signal<IOffice[]>([]);
  locations = signal<ILocation[]>([]);
  loading = signal<boolean>(false);
  mode = signal<'list' | 'create' | 'update' | null>('list');
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<IOffice>);

  ngOnInit() {
    this.getOffices();
    this.getLocations();
  }

  getOffices() {
    this.loading.set(true);
    this.officeServices.getAllOffices().subscribe({
      next: (response) => {
        if (response.success) {
          this.offices.set(response.data);
        } else {
          this.alertsService.showErrorAlert(`Error al obtener oficinas: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al obtener oficinas: ${error.message}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  getLocations() {
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
      }
    });
  }

  onAddOffice() {
    this.dataServices.clearSelectedItem();
    this.mode.set('create');
  }

  createOffice(office: IOffice) {
    this.loading.set(true);
    this.officeServices.createOffice(office).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertsService.showSuccessAlert('Oficina creada correctamente');
          this.mode.set('list');
          this.getOffices();
        } else {
          this.alertsService.showErrorAlert(`Error al crear la oficina: ${response.errors.join(', ')}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al crear la oficina: ${error.message}`);
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

  deleteOffice(id: string) {
    this.alertsService.showQuestionAlert('¿Estás seguro de querer eliminar esta oficina?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.officeServices.deleteOffice(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Oficina eliminada correctamente');
              this.getOffices();
            } else {
              this.alertsService.showErrorAlert(`Error al eliminar la oficina: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al eliminar la oficina: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }

  onEditOffice(office: IOffice) {
    this.dataServices.setSelectedItem(office);
    this.mode.set('update');
  }

  updateOffice(office: IOffice) {
    this.alertsService.showQuestionAlert('¿Estás seguro de querer actualizar esta oficina?').then((result: any) => {
      if (result.isConfirmed) {
        this.loading.set(true);
        this.officeServices.updateOffice(office).subscribe({
          next: (response) => {
            if (response.success) {
              this.alertsService.showSuccessAlert('Oficina actualizada correctamente');
              this.mode.set('list');
              this.getOffices();
            } else {
              this.alertsService.showErrorAlert(`Error al actualizar la oficina: ${response.errors.join(', ')}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al actualizar la oficina: ${error.message}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }
}
