import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth-services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  private authServices = inject(AuthServices);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  email = signal('');
  password = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  // Carousel logic
  images = [
    'assets/tuturno_login_1.png',
    'assets/tuturno_login_2.png',
    'assets/tuturno_login_3.png',
    'assets/tuturno_login_4.png',
    'assets/tuturno_login_5.png',
    'assets/tuturno_login_6.png',
    'assets/tuturno_login_7.png'
  ];
  currentImageIndex = signal(0);
  private carouselInterval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentImageIndex.update(index => (index + 1) % this.images.length);
    }, 5000); // Cambia cada 5 segundos
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    this.errorMessage.set('');
    if (this.email() && this.password()) {
      this.isLoading.set(true);
      this.authServices
        .login(this.email(), this.password())
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              this.router.navigate(['/dashboard']);
            } else {
              this.errorMessage.set(response.errors?.[0] || 'Error en el login');
              this.isLoading.set(false);
            }
          },
          error: (error) => {
            this.errorMessage.set(error.error?.errors?.[0] || 'Error al conectar con el servidor');
            this.isLoading.set(false);
          }
        });
    }
  }
}
