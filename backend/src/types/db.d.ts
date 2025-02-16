import { Model } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from './models';
import { SubscriptionAttributes, SubscriptionCreationAttributes } from './models';
import { ForwardingEventAttributes, ForwardingEventCreationAttributes } from './models';

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
export interface SubscriptionModel extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>, SubscriptionAttributes {}
export interface ForwardingEventModel extends Model<ForwardingEventAttributes, ForwardingEventCreationAttributes>, ForwardingEventAttributes {}

export interface ModelsInterface {
  User: typeof Model & { new (): UserModel };
  Subscription: typeof Model & { new (): SubscriptionModel };
  ForwardingEvent: typeof Model & { new (): ForwardingEventModel };
}

export interface Config {
  [key: string]: DatabaseConfig;
}

export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
}

export type UserStatic = typeof Model & { new (): UserModel };
export type SubscriptionStatic = typeof Model & { new (): SubscriptionModel };
export type ForwardingEventStatic = typeof Model & { new (): ForwardingEventModel };
