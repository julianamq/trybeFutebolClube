import { Router } from 'express';
import { validateLogin, validateToken } from './middelwares/token';
import LoginController from './controller/LoginController';

const router = Router();

router.post('/', validateLogin, LoginController.Login);
router.get('/validate', validateToken, LoginController.validate);

export default router;
