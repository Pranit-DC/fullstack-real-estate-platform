import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllContent,
  getSectionContent,
  updateSectionContent,
} from '../controllers/contentController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getAllContent);
router.get('/:section', getSectionContent);

router.patch(
  '/:section',
  requireAuth,
  [body().notEmpty().withMessage('Request body cannot be empty.')],
  updateSectionContent
);

export default router;
