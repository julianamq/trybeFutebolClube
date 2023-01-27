import { Router } from 'express';
import MatchesController from './controller/MatchesController';
// import Matche from './middelwares/Matche';
import { validateToken } from './middelwares/token';

const router = Router();
router.post('/', validateToken, MatchesController.createMatches);// 23
router.get('/', MatchesController.getAllMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.patch('/:id/finish', MatchesController.getFinish);

export default router;
