import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare email: string;
  declare password: string;
  declare name: string;
  declare role: string;
}

User.init({
  email: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
