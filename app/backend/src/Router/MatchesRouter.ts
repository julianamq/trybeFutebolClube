import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import { validateEqual, validateMatchesData } from '../middelwares/Matche';
// import Matche from './middelwares/Matche';
import validTokenMatch from '../middelwares/validTokenMatch';

const router = Router();
router.get('/', MatchesController.getAllMatches);
router.get('/?', MatchesController.getMatchByQuery);
router.post(
  '/',
  validTokenMatch,
  validateEqual,
  validateMatchesData,
  MatchesController.createMatches,
);
router.patch('/:id/finish', MatchesController.getFinish);
router.patch('/:id', MatchesController.byUpdate);
export default router;
