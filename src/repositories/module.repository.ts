import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export class ModuleRepository {
  async findAll() {
    return prisma.module.findMany();
  }

  async findById(id: string) {
    return prisma.module.findUnique({ where: { id } });
  }

  async create(data: Prisma.ModuleCreateInput) {
    return prisma.module.create({ data });
  }

  async update(id: string, data: Prisma.ModuleUpdateInput) {
    return prisma.module.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.module.delete({ where: { id } });
  }
}
