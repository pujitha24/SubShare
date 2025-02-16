import { Sequelize } from 'sequelize';
import config from '../config/config';
import * as dotenv from 'dotenv';
import defineUserModel from './user';
import defineSubscriptionModel from './subscription';
import defineForwardingEventModel from './forwardingEvent';
import type { ModelsInterface } from '../types/models';

// Load environment variables
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

if (!dbConfig.database || !dbConfig.username || !dbConfig.password) {
  throw new Error('Database configuration is incomplete');
}

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host || 'localhost',
    dialect: 'postgres',
    port: dbConfig.port || 5432
  }
);

// Initialize models
const models: ModelsInterface = {
  User: defineUserModel(sequelize),
  Subscription: defineSubscriptionModel(sequelize),
  ForwardingEvent: defineForwardingEventModel(sequelize)
};

// Set up associations
models.User.hasMany(models.Subscription, { foreignKey: 'user_id', as: 'subscriptions' });
models.Subscription.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
models.Subscription.hasMany(models.ForwardingEvent, { foreignKey: 'subscription_id', as: 'forwardingEvents' });
models.ForwardingEvent.belongsTo(models.Subscription, { foreignKey: 'subscription_id', as: 'subscription' });

export const { User, Subscription, ForwardingEvent } = models;
export { sequelize };
export default models;
