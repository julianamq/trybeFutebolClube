import { Request, Response } from 'express';

import MatchesService from '../service/MatchesService';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    if (req.query.inProgress) return MatchController.getMatchByQuery(req, res);
    const get = await MatchesService.getAllMatches();
    console.log(get);
    return res.status(200).json(get);
  }

  static async getMatchByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (typeof inProgress !== 'string') {
      return res.status(400).json({ message: 'false' });
    }
    if (inProgress !== 'true' && inProgress !== 'false') {
      return res.status(400).json({ message: 'false' });
    }
    const get = await MatchesService.getMatchByQueries(inProgress);
    return res.status(200).json(get);
  }
}
