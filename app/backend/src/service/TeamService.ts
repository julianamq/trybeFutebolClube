import Team from '../database/models/TeamModels';

export default class TeamService {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }

  static async getById(id: number) {
    const team = await Team.findByPk(id);
    if (!team) return { type: 'NOT_FOUND', message: 'Team not found' };
    return { type: null, message: team };
  }
}
