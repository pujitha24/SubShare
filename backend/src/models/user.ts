import { DataTypes, Sequelize } from 'sequelize';
import type { UserStatic } from '../types/db';

const defineUserModel = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  return User as unknown as UserStatic;
};

export default defineUserModel;
