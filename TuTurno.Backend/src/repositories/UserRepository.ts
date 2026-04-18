import { prisma } from '../lib/prisma';
import { User } from '../models/entities/User';

export interface CreateUserDTO {
  name: string;
  email: string;
  role?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: string;
  active?: boolean;
}

export class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u: typeof users[number]) => new User(u));
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? new User(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? new User(user) : null;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({ data });
    return new User(user);
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });
    return new User(user);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async existsByEmail(email: string, excludeId?: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        NOT: excludeId ? { id: excludeId } : undefined,
      },
    });
    return !!user;
  }
}
