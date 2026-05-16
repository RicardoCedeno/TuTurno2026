import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/getAllUsers', userController.getAll);
userRoutes.get('/getUserById/:id', userController.getById);
userRoutes.get('/getUsersByLocation/:locationId', userController.getByLocation);
userRoutes.post('/createUser', userController.create);
userRoutes.put('/updateUser/:id', userController.update);
userRoutes.delete('/deleteUser/:id', userController.delete);
userRoutes.patch('/deactivateUser/:id', userController.deactivate);

export default userRoutes;
