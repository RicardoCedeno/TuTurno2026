import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  
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
    if (this.email() && this.password()) {
      this.isLoading.set(true);
      console.log('Login attempt:', { email: this.email(), password: this.password() });
      // Simular delay de red
      setTimeout(() => this.isLoading.set(false), 2000);
    }
  }
}
