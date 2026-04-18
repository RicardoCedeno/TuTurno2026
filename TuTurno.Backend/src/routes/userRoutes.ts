import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// GET    /api/users
router.get('/', userController.getAll);

// GET    /api/users/:id
router.get('/:id', userController.getById);

// POST   /api/users
router.post('/', userController.create);

// PUT    /api/users/:id
router.put('/:id', userController.update);

// DELETE /api/users/:id
router.delete('/:id', userController.delete);

// PATCH  /api/users/:id/deactivate
router.patch('/:id/deactivate', userController.deactivate);

export default router;
