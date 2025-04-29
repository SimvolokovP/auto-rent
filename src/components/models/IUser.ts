import { ICar } from "./ICar";

export interface IUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  cars?: ICar[];
  points?: number;
}
