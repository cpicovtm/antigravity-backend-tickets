import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export class TicketRepository {
  async findAll() {
    return prisma.ticket.findMany({
      include: {
        creator: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });
  }

  async findAllByCreatorId(userId: string) {
    return prisma.ticket.findMany({
      where: { userId },
      include: {
        creator: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        creator: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
        comments: true,
      },
    });
  }

  async create(data: Prisma.TicketUncheckedCreateInput) {
    return prisma.ticket.create({ data });
  }

  async update(id: string, data: Prisma.TicketUncheckedUpdateInput) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.ticket.delete({ where: { id } });
  }
}
