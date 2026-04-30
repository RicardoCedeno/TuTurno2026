import { Component, inject, signal } from '@angular/core';
import { SpecialtiesServices } from '../../services/specialties-services';
import { ISpecialty } from '../../models/specialty';
import { SpecialtiesList } from '../specialties-list/specialties-list';
import { CommonModule } from '@angular/common';
import { SpecialtiesForm } from '../specialties-form/specialties-form';
import { AlertsService } from '../../services/alerts-service';

@Component({
  selector: 'app-specialties',
  imports: [SpecialtiesList, CommonModule, SpecialtiesForm],
  templateUrl: './specialties.html',
  styleUrl: './specialties.css',
  standalone: true,
})
export class Specialties {
  private specialtiesServices = inject(SpecialtiesServices);
  specialties = signal<ISpecialty[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);
  mode = signal<'list' | 'create' | 'update' | null>(null);
  private alertsService = inject(AlertsService);
  constructor() {
    this.mode.set('list');
    
  }

  getSpecialties() {
    this.loading.set(true);
    this.specialtiesServices.getSpecialties().subscribe({
      next: (response) => {
        this.specialties.set(response.data);
        console.log(this.specialties());
      },
      error: (error: any) => {
        this.error.set(error.message);
        console.error(error);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onAddSpecialty(){
    this.mode.set('create');
  }

  createSpecialty(specialty: ISpecialty){
    console.log(specialty);
    this.specialtiesServices.createSpecialty(specialty).subscribe({
      next: (response) => {
        if(response.success){
          this.alertsService.showSuccessAlert('Especialidad creada correctamente');
          this.mode.set('list');
          this.getSpecialties();
        } else {
          this.alertsService.showErrorAlert(`Error al crear la especialidad: ${JSON.stringify(response.errors)}`);
        }
      },
      error: (error: any) => {
        this.alertsService.showErrorAlert(`Error al crear la especialidad: ${JSON.stringify(error.errors)}`);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  onCancel(mode: string){
    this.mode.set(mode as 'list' | 'create' | 'update');
  }


  deleteSpecialty(id: string){
    this.alertsService.showQuestionAlert('¿Estás seguro de querer eliminar esta especialidad?').then((result: any) => {
      if(result.isConfirmed){
        this.loading.set(true);
        this.specialtiesServices.deleteSpecialty(id).subscribe({
          next: (response) => {
            if(response.success){
              this.alertsService.showSuccessAlert('Especialidad eliminada correctamente');
              this.getSpecialties();
            } else {
              this.alertsService.showErrorAlert(`Error al eliminar la especialidad: ${JSON.stringify(response.errors)}`);
            }
          },
          error: (error: any) => {
            this.alertsService.showErrorAlert(`Error al eliminar la especialidad: ${JSON.stringify(error.errors)}`);
          },
          complete: () => {
            this.loading.set(false);
          }
        });
      } else {
        this.alertsService.showWarningAlert('No se eliminó la especialidad');
      }
    });
  }
}
