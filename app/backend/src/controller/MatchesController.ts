import { Request, Response } from 'express';

import MatchesService from '../service/MatchesService';

export default class MatchController {
  static async getAllMatches(_req: Request, res: Response) {
    const get = await MatchesService.getAllMatches();
    return res.status(200).json(get);
  }
}
