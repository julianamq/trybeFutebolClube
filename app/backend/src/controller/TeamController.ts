import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAll();
    console.log(teams, 'times controller');

    return res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await TeamService.getById(+id);
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }

  static async functionGetTeams(_req: Request, res: Response) {
    const getTeams = await TeamService.getAll();
    if (!getTeams) {
      return res.status(404).json({ message: 'No teams found' });
    }
    return res.status(200).json(getTeams);
  }
}
