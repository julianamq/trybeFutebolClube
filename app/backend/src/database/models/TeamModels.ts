import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './MatchModel';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}
Team.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING(255),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});
Team.hasMany(Match, { foreignKey: 'id', as: 'matchId' });
