export interface TypeLeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface TypeLeaderboardWithTeams extends TypeLeaderboard {
  goalsBalance: number;
  efficiency: string;
}
