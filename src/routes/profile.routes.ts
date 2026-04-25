import { Router } from 'express';
import {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profile.controller';
import { requireRoles } from '../middlewares/permission.middleware';

const router = Router();

router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.post('/', requireRoles(['ADMIN']), createProfile);
router.put('/:id', requireRoles(['ADMIN']), updateProfile);
router.delete('/:id', requireRoles(['ADMIN']), deleteProfile);

export default router;
