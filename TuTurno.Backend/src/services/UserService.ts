import { User } from '../models/entities/User';
import { UserRepository, CreateUserDTO, UpdateUserDTO } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const emailTaken = await this.userRepository.existsByEmail(data.email);
    if (emailTaken) {
      throw new Error(`Email ${data.email} is already in use`);
    }
    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    await this.getUserById(id); // throws if not found

    if (data.email) {
      const emailTaken = await this.userRepository.existsByEmail(data.email, id);
      if (emailTaken) {
        throw new Error(`Email ${data.email} is already in use`);
      }
    }

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id); // throws if not found
    await this.userRepository.delete(id);
  }

  async deactivateUser(id: string): Promise<User> {
    return this.updateUser(id, { active: false });
  }
}
