import { Request } from 'express';
import { UserModel } from './db';

export interface AuthenticatedRequest extends Request {
  user?: UserModel;
}

export * from './db';
