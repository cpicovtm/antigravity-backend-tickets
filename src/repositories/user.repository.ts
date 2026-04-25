import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findAll() {
    return prisma.user.findMany({
      include: { profile: true },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput | Prisma.UserUncheckedCreateInput) {
    return prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
