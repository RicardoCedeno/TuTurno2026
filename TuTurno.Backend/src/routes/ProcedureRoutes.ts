import { Router } from "express";
import { ProcedureController } from "../controllers/ProcedureController";

const router = Router();
const procedureController = new ProcedureController();

// Conforme a las convenciones de nombres de AppointmentRoutes y los requisitos del usuario
router.get("/getAllProcedures", procedureController.getAll);
router.get("/getProceduresByPatient/:patientId", procedureController.getByPatient);
router.get("/getProceduresByPatientId/:patientId", procedureController.getByPatient); // Alias para cumplir req. getProceduresByPatientId
router.get("/getProceduresByDoctor/:doctorId", procedureController.getByDoctor);
router.get("/getProceduresByDoctorId/:doctorId", procedureController.getByDoctor); // Alias para cumplir req. getProceduresByDoctorId
router.get("/getProceduresById/:id", procedureController.getById);
router.post("/addProcedure", procedureController.create);
router.put("/updateProcedure/:id", procedureController.update);
router.delete("/deleteProcedure/:id", procedureController.delete);

export default router;
