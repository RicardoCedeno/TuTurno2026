import {Router} from "express";
import { DoctorController } from "../controllers/DoctorController";

const doctorRoutes = Router();
const doctorController = new DoctorController();

doctorRoutes.get('/getAllDoctors', doctorController.getAll);
doctorRoutes.get('/getDoctorById/:id', doctorController.getById);
doctorRoutes.post('/createDoctor', doctorController.create);
doctorRoutes.put('/updateDoctor/:id', doctorController.update);
doctorRoutes.delete('/deleteDoctor/:id', doctorController.delete);
doctorRoutes.get('/getDoctorsBySpecialty/:specialtyId', doctorController.getBySpecialty);

export default doctorRoutes;