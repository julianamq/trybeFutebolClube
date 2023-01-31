import { TypeLeaderboardWithTeams } from './typesLeader';

const sortByPoints = (a: TypeLeaderboardWithTeams, b: TypeLeaderboardWithTeams) => {
  if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
  if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
  if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
  return (b.goalsFavor - a.goalsFavor);
};

export default (
  array: TypeLeaderboardWithTeams[],
) : TypeLeaderboardWithTeams[] => array.sort(sortByPoints);
