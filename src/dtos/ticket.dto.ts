import { z } from 'zod';
import { TicketStatus, TicketPriority } from '@prisma/client';

export const createTicketSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.nativeEnum(TicketStatus).optional(),
  priority: z.nativeEnum(TicketPriority).optional(),
  userId: z.string().uuid().optional(),
  assignedTo: z.string().uuid().optional(),
});

export const updateTicketSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.nativeEnum(TicketStatus).optional(),
  priority: z.nativeEnum(TicketPriority).optional(),
  userId: z.string().uuid().optional(),
  assignedTo: z.string().uuid().nullable().optional(),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(['IN_PROGRESS', 'REJECTED', 'RESOLVED']),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
export type UpdateTicketStatusDto = z.infer<typeof updateTicketStatusSchema>;
