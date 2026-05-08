# Funcionalidades del Sistema TuTurno

Este documento detalla las secciones y funcionalidades principales del frontend de la aplicación TuTurno, basado en la estructura de componentes y servicios actuales.

## 1. Autenticación y Acceso
- **Login:** Interfaz de acceso para usuarios del sistema. Utiliza una serie de imágenes de fondo (`tuturno_login_X.png`) para una experiencia visual dinámica.

## 2. Gestión de Pacientes
- **Listado de Pacientes:** Visualización de todos los pacientes registrados en el sistema.
- **Formulario de Pacientes:** Registro de nuevos pacientes y edición de datos existentes.
- **Servicios:** Manejo de datos y persistencia a través de `patient-services.ts`.

## 3. Gestión de Médicos (Doctors)
- **Directorio de Médicos:** Listado y administración de profesionales de la salud.
- **Formulario de Médicos:** Gestión de perfiles médicos.
- **Especialidades:** Vinculación de médicos con sus respectivas especialidades.
- **Disponibilidad Médica:**
    - Configuración de horarios de atención (`doctor-availability-form`).
    - Visualización de calendarios de disponibilidad (`doctor-availability-list`).
    - Gestión de "No Disponibilidad" para fechas específicas.

## 4. Gestión de Citas (Appointments)
- **Control de Citas:** Vista general de la agenda.
- **Agendamiento:** Formulario para la creación de nuevas citas médicas.
- **Listado de Citas:** Seguimiento de citas programadas, realizadas o pendientes.

## 5. Cancelaciones de Citas
- **Módulo de Cancelaciones:** Gestión específica para el proceso de anulación de turnos.
- **Historial de Cancelaciones:** Registro detallado de por qué y cuándo se canceló una cita.

## 6. Configuración de Red Médica
- **Sedes (Locations):** Gestión de los edificios o centros de atención.
- **Consultorios (Offices):** Administración de los espacios físicos específicos dentro de cada sede.
- **Especialidades:** Definición del catálogo de especialidades médicas ofrecidas.

## 7. Inteligencia Artificial
- **Servicios de IA para Especialidades:** El sistema cuenta con `specialties-ai-services.ts`, lo que sugiere funcionalidades de sugerencia o categorización inteligente de especialidades.

## 8. Otros Componentes
- **Dashboard / Home:** Pantalla principal de bienvenida y resumen de actividad.
- **Sistema de Alertas:** Servicio centralizado para notificaciones al usuario (`alerts-service.ts`).
- **Manejo de Datos:** Servicios compartidos para la comunicación con la API y manejo de estados.

---
*Nota: Este documento se genera automáticamente analizando la arquitectura de archivos del proyecto.*
