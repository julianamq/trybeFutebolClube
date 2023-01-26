import { Router } from 'express';
import MatchesController from './controller/MatchesController';

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.patch('/matches/:id/finish', MatchesController.getFinish);

export default router;
