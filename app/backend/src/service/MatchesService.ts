import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModels';

export default class MatchesService {
  static async getAll() {
    const Matches = await Match.findAll();
    return Matches;
  }

  static async getById(id: number) {
    const Matches = await Match.findByPk(id);
    if (!Matches) return { type: 'NOT_FOUND', message: 'Matches not found' };
    return { type: null, message: Match };
  }

  static async getAllMatches() {
    const matches = await Match.findAll({
      include: [
        { model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  static async getMatcheById(id: number) {
    const getMatchById = await Match.findByPk(id);
    if (!getMatchById) {
      return { type: null, message: getMatchById };
    }
    return { type: 'success', message: getMatchById };
  }
}
