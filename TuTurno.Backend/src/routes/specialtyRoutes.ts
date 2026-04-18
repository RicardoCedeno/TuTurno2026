//rutas para specialty
import { Router } from "express";
import { SpecialtyController } from "../controllers/specialtyController";

const specialtyRoutes = Router();
const specialtyController = new SpecialtyController();

// GET    /api/specialties
specialtyRoutes.get('/getAllSpecialties', specialtyController.getAll);

// GET    /api/specialties/:id
specialtyRoutes.get('/getSpecialtyById/:id', specialtyController.getById);

// POST   /api/specialties
specialtyRoutes.post('/createSpecialty', specialtyController.create);

// PUT    /api/specialties/:id
specialtyRoutes.put('/updateSpecialty/:id', specialtyController.update);

// DELETE /api/specialties/:id
specialtyRoutes.delete('/deleteSpecialty/:id', specialtyController.delete);

export default specialtyRoutes;