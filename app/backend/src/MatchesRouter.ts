import { Router } from 'express';
import MatchesController from './controller/MatchesController';
import { validateToken } from './middelwares/token';

const router = Router();
router.post('/', validateToken);
router.get('/', MatchesController.getAllMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.patch('/matches/:id/finish', MatchesController.getFinish);

export default router;
