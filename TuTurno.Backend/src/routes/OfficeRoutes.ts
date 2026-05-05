import { Router } from "express";
import { OfficeController } from "../controllers/OfficeController";

const officeRoutes = Router();
const officeController = new OfficeController();

officeRoutes.get('/getAllOffices', officeController.getAll);
officeRoutes.get('/getActiveOffices', officeController.getActive);
officeRoutes.get('/getInactiveOffices', officeController.getInactive);
officeRoutes.get('/getOfficesByLocation/:locationId', officeController.getByLocationId);
officeRoutes.get('/getOfficesByFloor/:floor', officeController.getByFloor);
officeRoutes.get('/getOfficeById/:id', officeController.getById);
officeRoutes.post('/createOffice', officeController.create);
officeRoutes.put('/updateOffice/:id', officeController.update);
officeRoutes.delete('/deleteOffice/:id', officeController.delete);

export default officeRoutes;
