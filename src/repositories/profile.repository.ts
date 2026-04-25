import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export class ProfileRepository {
  async findAll() {
    return prisma.profile.findMany();
  }

  async findById(id: string) {
    return prisma.profile.findUnique({ where: { id } });
  }

  async create(data: Prisma.ProfileCreateInput) {
    return prisma.profile.create({ data });
  }

  async update(id: string, data: Prisma.ProfileUpdateInput) {
    return prisma.profile.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.profile.delete({ where: { id } });
  }
}
