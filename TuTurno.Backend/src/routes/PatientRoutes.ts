import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const patientRoutes = Router();
const patientController = new PatientController();

patientRoutes.get("/getAllPatients", patientController.getAll);
patientRoutes.get("/getPatientById/:id", patientController.getById);
patientRoutes.post("/createPatient", patientController.create);
patientRoutes.put("/updatePatient/:id", patientController.update);
patientRoutes.delete("/deletePatient/:id", patientController.delete);

export default patientRoutes;
