import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth-services';
import { LocationServices } from '../../services/location-services';
import { IUser } from '../../models/user';
import { ILocation } from '../../models/location';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit, OnDestroy {
  private authServices = inject(AuthServices);
  private locationServices = inject(LocationServices);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  registerForm!: FormGroup;
  locations = signal<ILocation[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  successMessage = signal('');

  genderOptions = ['Masculino', 'Femenino', 'Otro'];

  ngOnInit(): void {
    this.initForm();
    this.loadLocations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, this.phoneValidator]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
        confirmPassword: ['', [Validators.required]],
        birthDate: ['', []],
        gender: ['', []],
        address: ['', []],
        city: ['', []],
        state: ['', []],
        country: ['', []],
        locationId: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private loadLocations(): void {
    this.locationServices
      .getActiveLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.locations.set(response.data);
          }
        },
        error: () => {
          this.errorMessage.set('Error al cargar las ubicaciones');
        }
      });
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);
    const isStrong = hasUpperCase && hasNumber;
    return isStrong ? null : { weakPassword: true };
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    const errors = field.errors;
    if (errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
    if (errors['minLength']) return `Mínimo ${errors['minLength'].requiredLength} caracteres`;
    if (errors['email']) return 'Email inválido';
    if (errors['invalidPhone']) return 'Teléfono inválido';
    if (errors['weakPassword']) return 'La contraseña debe incluir mayúsculas y números';
    return 'Campo inválido';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      birthDate: 'Fecha de nacimiento',
      gender: 'Género',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado/Provincia',
      country: 'País',
      locationId: 'Ubicación',
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  hasPasswordMismatch(): boolean {
    return !!(this.registerForm.hasError('passwordMismatch') && this.registerForm.get('confirmPassword')?.touched);
  }

  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading.set(true);
    const userData: IUser = {
      id: '',
      ...this.registerForm.value,
    };

    this.authServices
      .signup(userData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage.set('¡Registro exitoso! Redirigiendo al login...');
            setTimeout(() => this.router.navigate(['/login']), 2000);
          } else {
            this.errorMessage.set(response.errors?.[0] || 'Error en el registro');
            this.isLoading.set(false);
          }
        },
        error: (error) => {
          this.errorMessage.set(error.error?.errors?.[0] || 'Error al conectar con el servidor');
          this.isLoading.set(false);
        },
      });
  }
}
