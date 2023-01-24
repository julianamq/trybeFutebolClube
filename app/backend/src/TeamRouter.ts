import { Router } from 'express';
import TeamController from './controller/TeamController';

const router = Router();

router.get('/', TeamController.getAll);
router.get('/:id', TeamController.getById);

export default router;
