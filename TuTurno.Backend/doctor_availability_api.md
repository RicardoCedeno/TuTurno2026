# API Documentation: Doctor Availability (Recurrent)

This document describes the endpoints for managing the recurrent weekly availability of doctors in the TuTurno system.

**Base URL:** `/api/doctor-availability`

---

## 1. Get Availability by Doctor
Returns the list of recurrent time slots for a specific doctor.

*   **URL:** `/doctor/:doctorId`
*   **Method:** `GET`
*   **URL Params:** 
    *   `doctorId` (string, required): Unique identifier of the doctor.
*   **Response (Success):** `ResponseDto<DoctorAvailabilityDto[]>`
    *   `success`: boolean
    *   `errors`: string[]
    *   `data`: Array of objects:
        *   `id`: string
        *   `doctorId`: string
        *   `dayOfWeek`: number (0=Sunday, 1=Monday... 6=Saturday)
        *   `startTime`: string (Format "HH:mm")
        *   `endTime`: string (Format "HH:mm")

---

## 2. Create Availability Slot
Registers a new recurrent availability slot for a doctor.

*   **URL:** `/`
*   **Method:** `POST`
*   **Body Type:** `DoctorAvailabilityDto`
    *   `doctorId`: string (required)
    *   `dayOfWeek`: number (required, 0-6)
    *   `startTime`: string (required, "HH:mm")
    *   `endTime`: string (required, "HH:mm")
*   **Response (Success):** `ResponseDto<string[]>`
    *   `success`: boolean (true if created, false if validation errors like overlaps occur)
    *   `errors`: string[] (contains error messages if success is false)
    *   `data`: []

---

## 3. Create Bulk Availability Slots
Registers multiple availability slots in a single request.

*   **URL:** `/bulk`
*   **Method:** `POST`
*   **Body Type:** `DoctorAvailabilityDto[]`
*   **Response (Success):** `ResponseDto<string[]>`
    *   `success`: boolean (false if any slot fails validation)
    *   `errors`: string[] (contains specific messages for each failed slot)
    *   `data`: []

---

## 4. Delete Availability Slot
Removes a specific availability slot by its ID.

*   **URL:** `/:id`
*   **Method:** `DELETE`
*   **URL Params:**
    *   `id` (string, required): Unique identifier of the availability slot.
*   **Response (Success):** `ResponseDto<string[]>`
    *   `success`: boolean
    *   `errors`: string[]
    *   `data`: []
