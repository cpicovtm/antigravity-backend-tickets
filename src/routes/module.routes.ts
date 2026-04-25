import { Router } from 'express';
import {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from '../controllers/module.controller';
import { requireRoles } from '../middlewares/permission.middleware';

const router = Router();

router.get('/', getModules);
router.get('/:id', getModuleById);
router.post('/', requireRoles(['ADMIN']), createModule);
router.put('/:id', requireRoles(['ADMIN']), updateModule);
router.delete('/:id', requireRoles(['ADMIN']), deleteModule);

export default router;
