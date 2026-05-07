import { Router } from "express";
import { AppointmentCancellationController } from "../controllers/AppointmentCancellationController";

const router = Router();
const cancellationController = new AppointmentCancellationController();

router.get("/getAllCancellations", cancellationController.getAll);
router.get("/getCancellationsByPatient/:patientId", cancellationController.getByPatient);
router.get("/getCancellationsByDoctor/:doctorId", cancellationController.getByDoctor);
router.get("/getCancellationsByDateRange", cancellationController.getByDateRange);
router.post("/createCancellation", cancellationController.create);
router.delete("/deleteCancellation/:id", cancellationController.delete);

export default router;
