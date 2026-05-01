import { Component, signal, OnInit, OnDestroy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutuCalendarComponent, CalendarEvent, CalendarEventCreate, CalendarEventUpdate } from '@tutu/calendar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TutuCalendarComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  email = signal('');
  password = signal('');
  showPassword = signal(false);
  isLoading = signal(false);
  events = signal<CalendarEvent[]>([]);
  startTime = signal('09:00');
  endTime = signal('09:30');
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

  onCreate(slot: CalendarEventCreate): void {
    this.pendingSlot.set(slot);
  
    this.startTime.set(this.toTimeInputValue(slot.start));
    this.endTime.set(this.toTimeInputValue(slot.end));
  
    this.showCreateModal.set(true);
  }
  onUpdate(update: CalendarEventUpdate): void {
    this.events.update(events =>
      events.map(event =>
        event.id === update.event.id ? update.event : event
      )
    );
  }
  pendingSlot = signal<CalendarEventCreate | null>(null);
  showCreateModal = signal(false);

  form = {
    title: '',
    color: '#2563eb',
    status: 'pending' as CalendarEvent['status']
  };

  saveAppointment(): void {
    const slot = this.pendingSlot();

    if (!slot) {
      return;
    }
    const [startHour, startMinute] = this.startTime().split(':').map(Number);
    const [endHour, endMinute] = this.endTime().split(':').map(Number);
    const start = new Date(slot.start);
    start.setHours(startHour, startMinute, 0, 0);
    const end = new Date(slot.start);
    end.setHours(endHour, endMinute, 0, 0);

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: this.form.title || 'Nueva cita',
      start: start,
      end: end,
      color: this.form.color,
      status: this.form.status,
      draggable: true,
      resizable: true
    };

    this.events.update(events => [...events, newEvent]);

    this.pendingSlot.set(null);
    this.showCreateModal.set(false);

    this.form = {
      title: '',
      color: '#2563eb',
      status: 'pending'
    };
  }
  onDelete(event: CalendarEvent): void {
    this.events.update(events =>
      events.filter(candidate => candidate.id !== event.id)
    );
  }

  editingEvent = signal<CalendarEvent | null>(null);

  editForm = {
    title: '',
    color: '#2563eb',
    status: 'pending' as CalendarEvent['status']
  };

  openEdit(event: CalendarEvent): void {
    console.log('openEdit', event);
    this.editingEvent.set(event);

    this.editForm = {
      title: event.title,
      color: event.color || '#2563eb',
      status: event.status || 'pending'
    };
  }

  saveEdit(): void {
    const event = this.editingEvent();

    if (!event) {
      return;
    }

    const updatedEvent: CalendarEvent = {
      ...event,
      title: this.editForm.title,
      color: this.editForm.color,
      status: this.editForm.status
    };

    this.events.update(events =>
      events.map(candidate =>
        candidate.id === updatedEvent.id ? updatedEvent : candidate
      )
    );

    this.editingEvent.set(null);
  }

  private toTimeInputValue(date: Date): string {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }


}
