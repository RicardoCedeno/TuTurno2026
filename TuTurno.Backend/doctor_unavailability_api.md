# API Documentation: Doctor Unavailability (Schedule Blocks)

This document describes the endpoints for managing schedule blocks (vacations, emergencies, breaks) for doctors in the TuTurno system.

**Base URL:** `/api/doctor-unavailability`

---

## 1. Get Unavailability Blocks by Doctor
Returns the list of all scheduled blocks for a specific doctor.

*   **URL:** `/doctor/:doctorId`
*   **Method:** `GET`
*   **URL Params:** 
    *   `doctorId` (string, required): Unique identifier of the doctor.
*   **Response (Success):** `ResponseDto<DoctorUnavailabilityDto[]>`
    *   `success`: boolean
    *   `errors`: string[]
    *   `data`: Array of objects:
        *   `id`: string
        *   `doctorId`: string
        *   `startDate`: string (ISO 8601 Date format)
        *   `endDate`: string (ISO 8601 Date format)
        *   `reason`: string | null (Optional reason for the block)

---

## 2. Create Unavailability Block
Registers a new schedule block. The system automatically validates that it doesn't overlap with existing blocks.

*   **URL:** `/`
*   **Method:** `POST`
*   **Body Type:** `DoctorUnavailabilityDto`
    *   `doctorId`: string (required)
    *   `startDate`: Date (required)
    *   `endDate`: Date (required)
    *   `reason`: string (optional)
*   **Response (Success):** `ResponseDto<string[]>`
    *   `success`: boolean (false if there are overlaps)
    *   `errors`: string[] (contains validation messages)
    *   `data`: []

---

## 3. Create Bulk Unavailability Blocks
Registers multiple schedule blocks in a single request.

*   **URL:** `/bulk`
*   **Method:** `POST`
*   **Body Type:** `DoctorUnavailabilityDto[]`
*   **Response (Success):** `ResponseDto<string[]>`
    *   `success`: boolean (false if any block fails validation)
    *   `errors`: string[] (contains specific messages for each failed block)
    *   `data`: []

---

## 4. Delete Unavailability Block
Removes a specific schedule block by its ID.

*   **URL:** `/:id`
*   **Method:** `DELETE`
*   **URL Params:**
    *   `id` (string, required): Unique identifier of the block.
*   **Response (Success):** `ResponseDto<string[]>`
    *   `success`: boolean
    *   `errors`: string[]
    *   `data`: []
