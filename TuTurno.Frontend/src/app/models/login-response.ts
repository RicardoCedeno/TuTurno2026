import { IUser } from './user';

export interface ILoginResponse {
  token: string;
  user: Omit<IUser, 'password'>;
}
