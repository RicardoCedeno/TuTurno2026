import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features = [
    {
      category: 'Gestión Principal',
      items: [
        {
          title: 'Pacientes',
          description: 'Registro centralizado y expedientes clínicos.',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
          route: '/patients',
          color: 'blue'
        },
        {
          title: 'Médicos',
          description: 'Perfiles, especialidades y horarios.',
          icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z',
          route: '/doctors',
          color: 'green'
        },
        {
          title: 'Agenda',
          description: 'Control de citas y calendario inteligente.',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
          route: '/appointments',
          color: 'sky'
        }
      ]
    },
    {
      category: 'Configuración y Red',
      items: [
        {
          title: 'Red Médica',
          description: 'Sedes, consultorios y especialidades.',
          icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
          route: '/locations',
          color: 'purple'
        },
        {
          title: 'Cancelaciones',
          description: 'Análisis y motivos de inasistencias.',
          icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
          route: '/cancellations',
          color: 'red'
        }
      ]
    }
  ];
}
