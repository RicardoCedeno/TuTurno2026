import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();
const appointmentController = new AppointmentController();

router.get("/getAllAppointments", appointmentController.getAll);
router.get("/getAppointmentsByPatient/:patientId", appointmentController.getByPatient);
router.get("/getAppointmentsByDateRange", appointmentController.getByDateRange);
router.get("/getAppointmentsByDoctor/:doctorId", appointmentController.getByDoctor);
router.get("/getAppointmentsByDoctor/:doctorId/range", appointmentController.getByDoctorAndDateRange);
router.get("/getAppointmentsByStatus/:status", appointmentController.getByStatus);
router.get("/getAppointmentsByPatient/:patientId/status/:status", appointmentController.getByPatientAndStatus);
router.get("/getAppointmentsByPatient/:patientId/doctor/:doctorId/status/:status", appointmentController.getByPatientDoctorAndStatus);
router.get("/getAppointmentById/:id", appointmentController.getById);
router.post("/createAppointment", appointmentController.create);
router.put("/updateAppointment/:id", appointmentController.update);
router.delete("/deleteAppointment/:id", appointmentController.delete);

export default router;
