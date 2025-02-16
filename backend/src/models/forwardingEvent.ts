import { DataTypes, Sequelize } from 'sequelize';
import type { ForwardingEventStatic } from '../types/db';

const defineForwardingEventModel = (sequelize: Sequelize) => {
  const ForwardingEvent = sequelize.define('ForwardingEvent', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'subscriptions',
        key: 'id'
      }
    },
    subscription_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    forwarding_status: {
      type: DataTypes.ENUM('pending', 'active', 'failed', 'disabled'),
      defaultValue: 'pending',
      allowNull: false
    },
    admin_email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin@subshare.com'
    }
  }, {
    tableName: 'forwarding_events',
    timestamps: true,
    underscored: true
  });

  return ForwardingEvent as unknown as ForwardingEventStatic;
};

export default defineForwardingEventModel;
