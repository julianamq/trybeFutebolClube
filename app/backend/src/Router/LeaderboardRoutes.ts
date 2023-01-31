import { Router } from 'express';
import LeaderboardController from '../controller/LeaderController';

const router = Router();

router.get('/home', LeaderboardController.getLeader);

export default router;
