import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, input, Output, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ISpecialty } from '../../models/specialty';
import { DataServices } from '../../services/data-services';
import { AlertsService } from '../../services/alerts-service';
import { SpecialtiesAiServices } from '../../services/ai-services/specialties-ai-services';

@Component({
  selector: 'app-specialties-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './specialties-form.html',
  styleUrl: './specialties-form.css',
  standalone: true,
})
export class SpecialtiesForm {
  createSpecialty = output<ISpecialty>();
  updateSpecialty = output<ISpecialty>();
  cancel = output<string>();
  mode = input<'create' | 'update' | null>(null);
  private dataServices = inject(DataServices<ISpecialty>);
  private specialtiesAiServices = inject(SpecialtiesAiServices);
  private cdr = inject(ChangeDetectorRef);
  formValues: Partial<ISpecialty> = { name: '', description: '' };
  buttonLabel: string = ''

  constructor() {
    effect(() => {
      const currentMode = this.mode();

      const selected = this.dataServices.selectedItem();
      if (currentMode === 'update' && selected) {
        this.formValues = { ...selected };
        this.buttonLabel = 'Actualizar';
      } else if (currentMode === 'create') {
        this.formValues = { name: '', description: '' };
        this.buttonLabel = 'Agregar';
      } else {
        this.formValues = { name: '', description: '' };
      }
    });
  }
  private alertsService = inject(AlertsService);

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.mode() === 'create') {
        this.createSpecialty.emit(form.value);
      } else if (this.mode() === 'update') {
        console.log("update")
        const specialty = this.dataServices.getSelectedItem();
        console.log("specialty", specialty);
        if (specialty) {
          console.log("specialty if", specialty);
          specialty.name = form.value.name;
          specialty.description = form.value.description;
          this.updateSpecialty.emit(specialty);
        } else {
          this.alertsService.showWarningAlert('No hay una especialidad seleccionada');
        }
      }
    } else {
      console.log('Form is not valid');
    }
  }

  onCancel() {
    this.cancel.emit('list');
  }

  generateDescription() {
    if (this.formValues.name) {
      this.specialtiesAiServices.generateSpecialtyDescription(this.formValues.name).subscribe({
        next: (res) => {
          console.log("res", res)
          if (res.data) {
            this.formValues = {
              ...this.formValues,
              description: res.data
            };
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Error generating description', err);
          this.alertsService.showErrorAlert('Error al generar la descripción');
        }
      });
    } else {
      this.alertsService.showWarningAlert('Por favor, ingresa un nombre para la especialidad');
    }
  }
}
