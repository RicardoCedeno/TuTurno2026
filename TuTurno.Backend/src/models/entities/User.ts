export class User {
  id?: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: {
    id?: string;
    name: string;
    email: string;
    role?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role ?? 'user';
    this.active = data.active ?? true;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  deactivate(): void {
    this.active = false;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
