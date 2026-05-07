# API Documentation: AppointmentCancellation Module

**Base Path:** `/api/appointment-cancellations`

---

## Modelos Relacionados (Frontend)

| Interfaz Backend | Interfaz Frontend (Angular) | Propiedades Clave |
| :--- | :--- | :--- |
| `ResponseDto<T>` | `IResponse<T>` | `success`, `errors`, `data` |
| `AppointmentCancellationDto` | `IAppointmentCancellation` | `id`, `appointmentId`, `cancelledBy`, `reason`, `cancelledAt` |

---

## Endpoints

### 1. Obtener todas las cancelaciones
- **Endpoint:** `/getAllCancellations`
- **Método HTTP:** `GET`
- **Propósito:** Recuperar el historial completo de citas canceladas en el sistema.
- **Request Type:** `N/A`
- **Response Type:** `IResponse<IAppointmentCancellation[]>`
- **Ejemplo de Request:** `GET /api/appointment-cancellations/getAllCancellations`
- **Ejemplo de Response:**
```json
{
  "success": true,
  "errors": [],
  "data": [
    {
      "id": "c123-uuid",
      "appointmentId": "app-456-uuid",
      "cancelledBy": "patient",
      "reason": "Cambio de planes",
      "cancelledAt": "2026-05-06T15:30:00.000Z"
    }
  ]
}
```

### 2. Obtener cancelaciones por Paciente
- **Endpoint:** `/getCancellationsByPatient/:patientId`
- **Método HTTP:** `GET`
- **Propósito:** Listar todas las cancelaciones asociadas a las citas de un paciente específico.
- **Parámetros:**
  - `patientId` (Path, string, Requerido)
- **Response Type:** `IResponse<IAppointmentCancellation[]>`

### 3. Obtener cancelaciones por Doctor
- **Endpoint:** `/getCancellationsByDoctor/:doctorId`
- **Método HTTP:** `GET`
- **Propósito:** Listar todas las cancelaciones de citas asignadas a un doctor específico.
- **Parámetros:**
  - `doctorId` (Path, string, Requerido)
- **Response Type:** `IResponse<IAppointmentCancellation[]>`

### 4. Obtener cancelaciones por Rango de Fechas
- **Endpoint:** `/getCancellationsByDateRange`
- **Método HTTP:** `GET`
- **Propósito:** Filtrar cancelaciones realizadas en un periodo de tiempo determinado.
- **Parámetros (Query):**
  - `start` (string/ISO Date, Requerido)
  - `end` (string/ISO Date, Requerido)
- **Ejemplo de Request:** `GET /api/appointment-cancellations/getCancellationsByDateRange?start=2026-05-01&end=2026-05-31`
- **Response Type:** `IResponse<IAppointmentCancellation[]>`

### 5. Crear Cancelación
- **Endpoint:** `/createCancellation`
- **Método HTTP:** `POST`
- **Propósito:** Registrar una nueva cancelación. **Importante:** Este endpoint actualiza automáticamente el estado de la cita relacionada a `"cancelled"`.
- **Request Body:** `IAppointmentCancellation` (sin `id` ni `cancelledAt`, ya que se generan en el backend)
- **Ejemplo de Request:**
```json
{
  "appointmentId": "app-789-uuid",
  "cancelledBy": "doctor",
  "reason": "Indisponibilidad de equipo médico"
}
```
- **Response Type:** `IResponse<string[]>` (Lista de errores, vacía si es exitoso)
- **Códigos HTTP:** `201 Created`, `400 Bad Request` (si la cita ya está cancelada o no existe).

### 6. Eliminar Registro de Cancelación
- **Endpoint:** `/deleteCancellation/:id`
- **Método HTTP:** `DELETE`
- **Propósito:** Eliminar el registro físico de una cancelación por su ID.
- **Parámetros:**
  - `id` (Path, string, Requerido)
- **Response Type:** `IResponse<string[]>`
- **Códigos HTTP:** `200 OK`, `404 Not Found`.
