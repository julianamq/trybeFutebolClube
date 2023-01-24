import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  static async Login(req: Request, res: Response) {
    const { type, message } = await LoginService.Login(req.body);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  }

  static async validate(req: Request, res: Response) {
    const { user } = req.body;
    return res.status(200).json({ role: user.data.role });
    // const { type, message } = await LoginService.validate(token);
    // if (type) return res.status(401).json({ message });
    // return res.status(200).json({ role: message });
  }
}
