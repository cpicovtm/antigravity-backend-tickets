import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export class OptionRepository {
  async findAll() {
    return prisma.option.findMany();
  }

  async findById(id: string) {
    return prisma.option.findUnique({ where: { id } });
  }

  async create(data: Prisma.OptionCreateInput | Prisma.OptionUncheckedCreateInput) {
    return prisma.option.create({ data });
  }

  async update(id: string, data: Prisma.OptionUpdateInput | Prisma.OptionUncheckedUpdateInput) {
    return prisma.option.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.option.delete({ where: { id } });
  }
}
