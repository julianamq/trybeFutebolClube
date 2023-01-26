import { Request, Response, NextFunction } from 'express';

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

  static async functionGetMatchByPost(req: Request, res: Response) {
    const result = await MatchesService.functionGetMatchByPost(req.body);
    if (result.type === 'error') {
      return res.status(404).json({ message: result.message });
    }
    return res.status(201).json(result.message);
  }

  static async getFinish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const message = await MatchesService.getFinish(+id);
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
}
