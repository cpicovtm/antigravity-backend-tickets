import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import moduleRoutes from './module.routes';
import optionRoutes from './option.routes';
import userRoutes from './user.routes';
import ticketRoutes from './ticket.routes';

const router = Router();

router.get('/health', getHealth);
router.use('/auth', authRoutes);

// Protected routes
router.use('/profiles', requireAuth, profileRoutes);
router.use('/modules', requireAuth, moduleRoutes);
router.use('/options', requireAuth, optionRoutes);
router.use('/users', requireAuth, userRoutes);
router.use('/tickets', requireAuth, ticketRoutes);

export default router;
