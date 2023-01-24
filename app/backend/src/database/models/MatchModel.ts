import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModels';

class Match extends Model {
  declare id: number;
  declare teamName: string;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Match',
    timestamps: false,
    tableName: 'matchs',
  },
);

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeamId' });

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeamId' });

export default Team;
