import { IProfile } from "../IUser";

export interface AuthResponse {
  access: string;
  refresh: string;
  user_info: IProfile;
}
