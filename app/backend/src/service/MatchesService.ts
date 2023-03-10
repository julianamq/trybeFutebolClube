import { IMatch } from '../interfaces/InterfacesMatch';
import { MatchesAndTeams } from '../middelwares/types';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModels';
import Declined from '../declined/declined';

export default class MatchesService {
  static async createMatches(data: IMatch) {
    const { awayTeamId, homeTeamId } = data;
    const homeTeam = await Match.findOne({ where: { id: homeTeamId } });
    const awayTeam = await Match.findOne({ where: { id: awayTeamId } });
    // console.log(homeTeam);
    if (!homeTeam || !awayTeam) {
      return { type: 'NOT_FOUND', message: 'There is no team with such id' };
    }
    const createdMatch = await Match.create({
      ...data,
      inProgress: true,
    });
    return { type: null, message: createdMatch };
  }

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

  static async getMatchByQueries(u: string) {
    const inProgress = u === 'true';
    if (typeof inProgress !== 'boolean') return { type: 'error', message: 'false' };
    const getMatchByQuery = await Match.findAll({
      where: { inProgress },
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
    return getMatchByQuery;
  }

  static async getMatchPost(body: MatchesAndTeams) {
    const { homeTeamId, awayTeamId } = body;
    const homeTeam = await Match.findByPk(homeTeamId);
    const awayTeam = await Match.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { type: 'error', message: 'There is no team with such id!' };
    }
    const { dataValues } = await Match.create({ ...body, inProgress: true });
    return { type: null, message: dataValues };
  }

  static async getFinish(id: number): Promise<string> {
    const [qtdUpdated] = await Match.update({ inProgress: false }, { where: { id } });
    if (qtdUpdated === 0) throw new Declined(400, 'Match not found');
    return 'Finished';
  }

  static async byUpdate(id: number, body: MatchesAndTeams) {
    const updatePatch = await Match.update({ ...body }, { where: { id } });
    if (updatePatch[0] === 0) {
      return { type: 'error', message: 'This match is already over' };
    }
    return { type: null, message: 'Updated' };
  }
}
