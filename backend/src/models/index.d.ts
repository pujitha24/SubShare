import { UserInstance } from '../src/types';

declare module '../models' {
  interface UserModel {
    findOne(options: any): Promise<UserInstance | null>;
    create(values: any): Promise<UserInstance>;
  }

  const User: UserModel;
}
