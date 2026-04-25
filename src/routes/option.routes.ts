import { Router } from 'express';
import {
  getOptions,
  getOptionById,
  createOption,
  updateOption,
  deleteOption,
} from '../controllers/option.controller';
import { requireRoles } from '../middlewares/permission.middleware';

const router = Router();

router.get('/', getOptions);
router.get('/:id', getOptionById);
router.post('/', requireRoles(['ADMIN']), createOption);
router.put('/:id', requireRoles(['ADMIN']), updateOption);
router.delete('/:id', requireRoles(['ADMIN']), deleteOption);

export default router;
