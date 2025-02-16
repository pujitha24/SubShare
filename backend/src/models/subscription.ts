import { DataTypes, Sequelize } from 'sequelize';
import type { SubscriptionStatic } from '../types/db';

const defineSubscriptionModel = (sequelize: Sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    screen_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    available_screens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM('pending_verification', 'verified', 'suspended'),
      defaultValue: 'pending_verification',
      allowNull: false
    }
  }, {
    tableName: 'subscriptions',
    timestamps: true,
    underscored: true
  });

  return Subscription as unknown as SubscriptionStatic;
};

export default defineSubscriptionModel;
