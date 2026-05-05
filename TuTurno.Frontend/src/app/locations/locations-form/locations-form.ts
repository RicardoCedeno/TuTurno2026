import { Component, inject, signal, OnInit, output, input, effect } from '@angular/core';
import { ILocation } from '../../models/location';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertsService } from '../../services/alerts-service';
import { DataServices } from '../../services/data-services';

@Component({
  selector: 'app-locations-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './locations-form.html',
  styleUrl: './locations-form.css',
})
export class LocationsForm {
  createLocation = output<ILocation>();
  updateLocation = output<ILocation>();
  cancel = output<'list' | 'create' | 'update'>();
  mode = input<'create' | 'update' | 'list' | null>(null);
  
  formValues: Partial<ILocation> = {
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    active: true
  };
  
  buttonLabel: string = '';
  
  private alertsService = inject(AlertsService);
  private dataServices = inject(DataServices<ILocation>);

  constructor() {
    effect(() => {
      const currentMode = this.mode();
      const selected = this.dataServices.selectedItem();
      
      if (currentMode === 'update' && selected) {
        this.formValues = { ...selected };
        this.buttonLabel = 'Actualizar';
      } else if (currentMode === 'create') {
        this.resetForm();
        this.buttonLabel = 'Agregar';
      }
    });
  }

  resetForm() {
    this.formValues = {
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      active: true
    };
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.mode() === 'create') {
        this.createLocation.emit(this.formValues as ILocation);
      } else if (this.mode() === 'update') {
        const location = this.dataServices.getSelectedItem();
        if (location) {
          const updatedLocation = { ...location, ...this.formValues };
          this.updateLocation.emit(updatedLocation as ILocation);
        } else {
          this.alertsService.showWarningAlert('No hay una sede seleccionada');
        }
      }
    }
  }

  onCancel() {
    this.cancel.emit('list');
  }
}
