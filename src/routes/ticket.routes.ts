import { Router } from 'express';
import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
} from '../controllers/ticket.controller';
import { requireRoles, requireSupportStatusOnlyUpdate } from '../middlewares/permission.middleware';

const router = Router();

router.get('/', requireRoles(['ADMIN', 'SOPORTE', 'CLIENTE']), getTickets);
router.get('/:id', requireRoles(['ADMIN', 'SOPORTE', 'CLIENTE']), getTicketById);
router.post('/', requireRoles(['ADMIN', 'CLIENTE']), createTicket);
router.put('/:id', requireRoles(['ADMIN', 'SOPORTE']), requireSupportStatusOnlyUpdate, updateTicket);
router.patch(
  '/:id/status',
  requireRoles(['ADMIN', 'SOPORTE']),
  requireSupportStatusOnlyUpdate,
  updateTicketStatus,
);
router.delete('/:id', requireRoles(['ADMIN']), deleteTicket);

export default router;
