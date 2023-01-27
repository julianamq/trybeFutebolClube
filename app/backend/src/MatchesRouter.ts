import { Router } from 'express';
import MatchesController from './controller/MatchesController';
import { validateMatchesData } from './middelwares/Matche';
// import Matche from './middelwares/Matche';
import { validateToken } from './middelwares/token';

const router = Router();
router.get('/', MatchesController.getAllMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.post('/', validateToken, validateMatchesData, MatchesController.createMatches);
router.patch('/:id/finish', MatchesController.getFinish);
router.patch('/:id', MatchesController.byUpdate);
export default router;
