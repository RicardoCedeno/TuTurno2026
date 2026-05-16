import { prisma } from "../lib/prisma";
import { User } from "../models/entities/User";
import { Role } from "@prisma/client";

export class UserRepository {
  async getUsersByLocationId(locationId: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { locationId },
    });
    return users.map(user => new User(user as any));
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(user => new User(user as any));
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? new User(user as any) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? new User(user as any) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { phone },
    });
    return user ? new User(user as any) : null;
  }

  async getUsersByLocationAndRole(locationId: string, role: Role): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        locationId,
        role: role
      },
    });
    return users.map(user => new User(user as any));
  }

  async create(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        active: user.active,
        locationId: user.locationId!,
        password: "temporary_password", // Placeholder or from user if added later
      },
    });
    return new User(newUser as any);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        active: user.active,
        locationId: user.locationId!,
        password: user.password!
      },
    });
    return updatedUser ? new User(updatedUser as any) : null as any;
  }
}
