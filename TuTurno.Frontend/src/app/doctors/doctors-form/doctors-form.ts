import { Component, inject, signal, OnInit } from '@angular/core';
import { IDoctor } from '../../models/doctor';
import { ISpecialty } from '../../models/specialty';
import { SpecialtiesServices } from '../../services/specialties-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertsService } from '../../services/alerts-service';

@Component({
  selector: 'app-doctors-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-form.html',
  styleUrl: './doctors-form.css',
})
export class DoctorsForm implements OnInit {
  private specialtiesServices = inject(SpecialtiesServices);
  private alertsService = inject(AlertsService);

  formValues: Partial<IDoctor> = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    doctorSpecialties: []
  };

  specialties = signal<ISpecialty[]>([]);
  loadingSpecialties = signal(false);

  ngOnInit() {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.loadingSpecialties.set(true);
    this.specialtiesServices.getSpecialties().subscribe({
      next: (res) => {
        if (res.success) {
          this.specialties.set(res.data);
        }
      },
      error: (err) => this.alertsService.showErrorAlert(err.message),
      complete: () => this.loadingSpecialties.set(false)
    });
  }

  toggleSpecialty(specialty: ISpecialty) {
    const current = this.formValues.doctorSpecialties || [];
    const index = current.findIndex(ds => ds.specialtyId === specialty.id);
    
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push({ 
        specialtyId: specialty.id,
        specialty: specialty 
      } as any);
    }
    this.formValues.doctorSpecialties = [...current];
  }

  isSpecialtySelected(specialtyId: string): boolean {
    return !!this.formValues.doctorSpecialties?.some(ds => ds.specialtyId === specialtyId);
  }

  onSubmit() {
    console.log('Guardando doctor:', this.formValues);
  }

  onCancel() {
    console.log('Cancelado');
  }
}
