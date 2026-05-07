# 🚀 TuTurno SaaS - Roadmap Estratégico de Funcionalidades

## 📌 Visión del Producto
TuTurno se posiciona como el sistema de gestión administrativa más rápido, simple y eficiente para clínicas y consultorios pequeños y medianos. El enfoque principal es la **velocidad operativa de la recepción** y la **reducción del ausentismo**, sin incurrir en costos de integraciones complejas (WhatsApp API, Twilio, Facturación).

> **Diferencial:** "Recepción Ultra Rápida" — Pocos clics, navegación instantánea y agendamiento en segundos.

---

## ✅ Fase 1: Optimización Operativa (Prioridad Alta)

### 🕒 Gestión de Disponibilidad y Bloqueos
*   **Bloqueo de Horarios:** Permitir marcar espacios como no disponibles (vacaciones, almuerzo, emergencias) para evitar errores de agenda.
*   **Horarios Configurables:** Definir jornadas personalizadas por doctor (ej: Lunes 8-12, Martes 14-18).

### 🚦 Flujo de Citas y Recepción
*   **Estados Avanzados:** Implementar flujo: *Pendiente → Confirmada → En Sala (Arribo) → En Consulta → Completada / No-Show*.
*   **Reagendamiento Rápido:** Mover citas manteniendo la trazabilidad del cambio y el motivo.
*   **Check-In Manual (Sala de Espera):** Botón de arribo para medir tiempos de espera real (Hora de Cita vs. Hora de Arribo).

### 📋 Información Crítica de Recepción
*   **Notas Internas "Sticky":** Alertas visibles solo para el staff (ej: "Paciente llega tarde frecuentemente", "Requiere autorización física").
*   **Búsqueda Global Inteligente:** Buscador unificado para pacientes, doctores, teléfonos y citas desde cualquier pantalla.

---

## ✅ Fase 2: Eficiencia y Seguimiento (Prioridad Media)

### 📈 Control de Agenda y Sobrecupos
*   **Lista de Espera (Waitlist):** Gestionar pacientes interesados en espacios que se liberen por cancelaciones.
*   **Gestión de Sobrecupos:** Permitir agendar citas en horarios ocupados bajo autorización, marcándolas visualmente para gestión de tiempos.
*   **Duración Variable:** Configurar duración de citas según el tipo de atención (Consulta: 20m, Control: 15m, Valoración: 40m).

### 📧 Comunicación y Documentación
*   **Recordatorios por Email (Low Cost):** Uso de SMTP (Brevo/Resend) para confirmaciones y recordatorios 24h antes del evento.
*   **Archivo Digital de Documentos:** Subida de fotos/PDFs de órdenes médicas o documentos de identidad directamente al perfil del paciente.
*   **Comprobante PDF:** Generación de recordatorios de cita imprimibles o para compartir manualmente.

### 📊 Dashboard y Métricas
*   **Panel Administrativo:** Métricas diarias (Citas hoy, pacientes nuevos, tasa de cancelación, doctores más activos).
*   **Motivos de Cancelación:** Tipificación para reportes (Falta de paciente, urgencia médica, error administrativo).

---

## ✅ Fase 3: Escalabilidad y Auditoría (Prioridad Baja)

### 🔐 Seguridad y Control
*   **Historial de Cambios (Audit Log):** Registro de quién modificó cada cita o dato de paciente para evitar conflictos.
*   **Etiquetas para Pacientes:** Identificadores visuales (Prioritario, Seguro Privado, Primera Vez).

### 🛠️ Extras y Reportes
*   **Exportación de Datos:** Descarga de reportes operativos en CSV/Excel.
*   **Detección Automática de Conflictos:** Validaciones en tiempo real de disponibilidad de doctor, oficina y paciente.
*   **Modo Oscuro:** Mejora en la experiencia visual para jornadas largas de recepción.

---

## ❌ Fuera de Alcance (A evitar inicialmente)
Para mantener la simplicidad y el bajo costo, el sistema **NO** incluirá:
*   Facturación electrónica.
*   Integraciones complejas con EPS/Aseguradoras.
*   WhatsApp Business API / Twilio (Mensajería de pago).
*   Historia clínica médica completa (EHR).
*   Pagos online integrados.

---

## 🏗️ Consideraciones Técnicas
1.  **Arquitectura:** Mantener APIs consistentes y modularidad para facilitar la escalabilidad.
2.  **Rendimiento:** Optimizar consultas para que la interfaz sea instantánea.
3.  **UX:** Priorizar el uso del teclado para recepcionistas expertas.
