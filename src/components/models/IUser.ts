import { ICar } from "./ICar";

export interface IUser {
  id?: number;
  email: string;
  phone: string;
}

export interface IProfile {
  id: number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  description?: string;
  date_birth?: string;
  points: number;
  user: IUser;
  cars: ICar[];
}
