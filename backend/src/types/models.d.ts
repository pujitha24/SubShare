import { Model, Optional } from 'sequelize';
import { UserModel } from './db';
import { SubscriptionModel } from './db';
import { ForwardingEventModel } from './db';

export interface ModelsInterface {
  User: typeof Model & { new (): UserModel };
  Subscription: typeof Model & { new (): SubscriptionModel };
  ForwardingEvent: typeof Model & { new (): ForwardingEventModel };
}

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubscriptionAttributes {
  id: string;
  user_id: string;
  service: string;
  email: string;
  password: string;
  screen_count: number;
  available_screens: number;
  status: 'pending_verification' | 'verified' | 'suspended';
  created_at?: Date;
  updated_at?: Date;
}

export interface ForwardingEventAttributes {
  id: string;
  subscription_id: string;
  subscription_email: string;
  service: string;
  forwarding_status: 'pending' | 'active' | 'failed' | 'disabled';
  admin_email: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;
export type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, 'id'>;
export type ForwardingEventCreationAttributes = Optional<ForwardingEventAttributes, 'id'>;
