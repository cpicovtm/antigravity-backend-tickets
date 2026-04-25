import { TicketRepository } from '../repositories/ticket.repository';
import { Prisma } from '@prisma/client';

const repository = new TicketRepository();
type Role = 'ADMIN' | 'SOPORTE' | 'CLIENTE';

type AuthUser = {
  userId: string;
  profileName: string;
};
type CreateTicketInput = Omit<Prisma.TicketUncheckedCreateInput, 'userId'> & {
  userId?: string;
};

const normalizeRole = (profileName: string): Role => profileName.trim().toUpperCase() as Role;

export class TicketService {
  async getAllTickets(user: AuthUser) {
    const role = normalizeRole(user.profileName);
    if (role === 'CLIENTE') {
      return repository.findAllByCreatorId(user.userId);
    }
    return repository.findAll();
  }

  async getTicketById(id: string, user: AuthUser) {
    const ticket = await repository.findById(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    const role = normalizeRole(user.profileName);
    if (role === 'CLIENTE' && ticket.userId !== user.userId) {
      throw new Error('Forbidden');
    }
    return ticket;
  }

  async createTicket(data: CreateTicketInput, user: AuthUser) {
    const role = normalizeRole(user.profileName);
    if (role === 'CLIENTE') {
      return repository.create({
        ...data,
        userId: user.userId,
      });
    }
    return repository.create({
      ...data,
      userId: data.userId ?? user.userId,
    });
  }

  async updateTicket(id: string, data: Prisma.TicketUncheckedUpdateInput, user: AuthUser) {
    await this.getTicketById(id, user);
    return repository.update(id, data);
  }

  async deleteTicket(id: string, user: AuthUser) {
    await this.getTicketById(id, user);
    return repository.delete(id);
  }
}
