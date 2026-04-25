import { UserRepository } from '../repositories/user.repository';
import { Prisma } from '@prisma/client';

const repository = new UserRepository();

export class UserService {
  async getAllUsers() {
    return repository.findAll();
  }

  async getUserById(id: string) {
    const user = await repository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data: Prisma.UserUncheckedCreateInput) {
    const existingUser = await repository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    return repository.create(data);
  }

  async updateUser(id: string, data: Prisma.UserUncheckedUpdateInput) {
    await this.getUserById(id);
    // Extra validation for email could be added here
    return repository.update(id, data);
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    return repository.delete(id);
  }
}
