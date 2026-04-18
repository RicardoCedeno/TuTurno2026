import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ success: true, data: users, count: users.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
 
      if (!id) {
        res.status(400).json({ success: false, message: 'Invalid ID' });
        return;
      }
      const user = await this.userService.getUserById(id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      const status = message.includes('not found') ? 404 : 500;
      res.status(status).json({ success: false, message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, role } = req.body;
      if (!name || !email) {
        res.status(400).json({ success: false, message: 'name and email are required' });
        return;
      }
      const user = await this.userService.createUser({ name, email, role });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      const status = message.includes('already in use') ? 409 : 500;
      res.status(status).json({ success: false, message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ success: false, message: 'Invalid ID' });
        return;
      }
      const user = await this.userService.updateUser(id, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      const status = message.includes('not found') ? 404 : message.includes('already in use') ? 409 : 500;
      res.status(status).json({ success: false, message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ success: false, message: 'Invalid ID' });
        return;
      }
      await this.userService.deleteUser(id);
      res.status(200).json({ success: true, message: `User ${id} deleted successfully` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      const status = message.includes('not found') ? 404 : 500;
      res.status(status).json({ success: false, message });
    }
  };

  deactivate = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ success: false, message: 'Invalid ID' });
        return;
      }
      const user = await this.userService.deactivateUser(id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      const status = message.includes('not found') ? 404 : 500;
      res.status(status).json({ success: false, message });
    }
  };
}
