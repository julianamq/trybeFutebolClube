import { Router } from 'express';
import MatchesController from './controller/MatchesController';

const router = Router();

router.get('/', MatchesController.getAllMatches);

export default router;
