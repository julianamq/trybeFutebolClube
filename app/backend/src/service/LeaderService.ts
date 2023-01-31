import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModels';
import {
  getTotalPoints,
  getTotalVictories,
  getTotalDraws,
  getTotalHomeLosses,
  getHomeGoals,
  getAwaysGoals,
} from '../middelwares/helperLeader';

export default class LeaderboardService {
  static async getMatchesByTeamId(id: number) {
    const allMatches = await Match.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  static async homeTeams() {
    const allTeams = await Team.findAll();
    if (!allTeams.length) return [];
    const promises = allTeams.map((team) => this.getMatchesByTeamId(team.id));
    const match = await Promise.all(promises);
    return match;
  }

  static async getLeaderboardData() {
    const allTeams = await Team.findAll();
    if (!allTeams.length) return [];
    const data = await this.homeTeams();
    return data.map((team, index) => ({
      name: allTeams[index].teamName,
      totalPoints: team.reduce(getTotalPoints, 0),
      totalGames: team.length,
      totalVictories: team.reduce(getTotalVictories, 0),
      totalDraws: team.reduce(getTotalDraws, 0),
      totalLosses: team.reduce(getTotalHomeLosses, 0),
      goalsFavor: team.reduce(getHomeGoals, 0),
      goalsOwn: team.reduce(getAwaysGoals, 0),
      goalsBalance: team.reduce(getHomeGoals, 0) - team.reduce(getAwaysGoals, 0),
      efficiency: ((team.reduce(getTotalPoints, 0) / (team.length * 3)) * 100).toFixed(2),
    }));
  }

  static async getLeader() {
    const data = await this.getLeaderboardData();
    const sortedData = data.sort((a, b) => {
      if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
      if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
      return (b.goalsFavor - a.goalsFavor);
    });
    if (!sortedData) return { type: 'error', message: 'No matches for these teams.' };
    return { type: null, message: sortedData };
  }
}
// ajuda Luide, Ewerton , Laura - exerc 29 e 30
