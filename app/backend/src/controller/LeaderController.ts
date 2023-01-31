import { Request, Response } from 'express';
import LeaderService from '../service/LeaderService';

export default abstract class LeaderboardController {
  static async getLeader(_req: Request, res: Response) {
    const { type, message } = await LeaderService.getLeader();
    if (type) return res.status(404).json({ message });
    return res.status(200).json(message);
  }
}
