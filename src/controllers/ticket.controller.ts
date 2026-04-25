import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';
import { z } from 'zod';
import { createTicketSchema, updateTicketSchema, updateTicketStatusSchema } from '../dtos/ticket.dto';
import { getErrorMessage } from '../utils/error.util';

const ticketService = new TicketService();
type AuthenticatedRequest = Request & {
  user?: {
    userId: string;
    profileName: string;
  };
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user!;
    const tickets = await ticketService.getAllTickets(user);
    res.status(200).json({ status: 'success', data: tickets });
  } catch (error: unknown) {
    res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user!;
    const { id } = req.params;
    const ticket = await ticketService.getTicketById(id, user);
    res.status(200).json({ status: 'success', data: ticket });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Ticket not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else if (getErrorMessage(error) === 'Forbidden') {
      res.status(403).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user!;
    const validatedData = createTicketSchema.parse(req.body);
    const newTicket = await ticketService.createTicket(validatedData, user);
    res.status(201).json({ status: 'success', data: newTicket });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user!;
    const { id } = req.params;
    const validatedData = updateTicketSchema.parse(req.body);
    const updatedTicket = await ticketService.updateTicket(id, validatedData, user);
    res.status(200).json({ status: 'success', data: updatedTicket });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Ticket not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else if (getErrorMessage(error) === 'Forbidden') {
      res.status(403).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user!;
    const { id } = req.params;
    const validatedData = updateTicketStatusSchema.parse(req.body);
    const updatedTicket = await ticketService.updateTicket(id, validatedData, user);
    res.status(200).json({ status: 'success', data: updatedTicket });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Ticket not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else if (getErrorMessage(error) === 'Forbidden') {
      res.status(403).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthenticatedRequest).user!;
    const { id } = req.params;
    await ticketService.deleteTicket(id, user);
    res.status(200).json({ status: 'success', data: null });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Ticket not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else if (getErrorMessage(error) === 'Forbidden') {
      res.status(403).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};
