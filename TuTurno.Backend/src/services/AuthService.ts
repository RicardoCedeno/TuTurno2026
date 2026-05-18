import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { User, Role } from "@prisma/client";
import { UserDto } from "../models/dtos/UserDto";
import { UserMapper } from "../models/mappers/userMapper";

interface JwtPayload {
  id: string;
  role: Role;
}

class AuthService {
  private readonly JWT_SECRET: string;
  private readonly SALT_ROUNDS = 10;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
    if (this.JWT_SECRET === "default_secret_key_change_me" && process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be defined in production environment");
    }
  }

  /**
   * Generates a hash for a plain text password
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compares a plain text password with a hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Registers a new user
   */
  async signUp(userData: UserDto): Promise<Omit<UserDto, "password">> {
    if (!userData.email || !userData.password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const hashedPassword = await this.hashPassword(userData.password);

    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        phone: userData.phone,
        role: userData.role || Role.RECEPCIONIST,
        locationId: userData.locationId,
        active: true,
      },
    });

    const userDto = UserMapper.toDto(newUser as any);
    const { password, ...userWithoutPassword } = userDto;
    return userWithoutPassword;
  }

  /**
   * Authenticates a user and returns a JWT
   */
  async login(email: string, password: string): Promise<{ token: string; user: Omit<UserDto, "password"> }> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.active) {
      throw new Error("Invalid credentials or inactive user");
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userDto = UserMapper.toDto(user as any);
    const { password: _, ...userWithoutPassword } = userDto;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  /**
   * Verifies a JWT and returns the payload
   */
  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}

export default new AuthService();
