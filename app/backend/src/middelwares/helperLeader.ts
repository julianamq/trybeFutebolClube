import Match from '../database/models/MatchModel';

export const getTotalPoints = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getTotalVictories = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getTotalDraws = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getTotalHomeLosses = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
  return acc;
};
export const getHomeGoals = (acc: number, curr: Match): number => acc + curr.homeTeamGoals;
export const getAwaysGoals = (acc: number, curr: Match): number => acc + curr.awayTeamGoals;

// teste
