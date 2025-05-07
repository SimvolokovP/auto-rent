import { AxiosResponse } from "axios";

import { CarCreateDto } from "../components/models/dtos/CarCreateDto.dto";
import { UserLoginDto } from "../components/models/dtos/UserLogin.dto";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";
import { IProfile, IUser } from "../components/models/IUser";
import { AuthResponse } from "../components/models/response/AuthResponse";
import { authHost, host } from ".";

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export class UserService {
  static async registration(
    user: UserRegisterDto
  ): Promise<AxiosResponse<AuthResponse>> {
    try {
      const { email, password, phone } = user;
      // console.log({ ...user, phone: normalizePhone(phone) });
      const response = await host.post("/registration/", {
        email,
        password,
        phone: normalizePhone(phone),
      });
      return response;
    } catch (err) {
      console.warn("Registration error:", err);
      throw err;
    }
  }

  static async login(user: UserLoginDto): Promise<AxiosResponse<AuthResponse>> {
    try {
      const { email, password } = user;
      const response = await host.post("/token/", { email, password });
      return response;
    } catch (err) {
      console.warn("Login error:", err);
      throw err;
    }
  }

  static async getMe(): Promise<AxiosResponse<IProfile>> {
    try {
      const response = await authHost.get("/user/me/");
      return response;
    } catch (err) {
      console.warn("GetMe error:", err);
      throw err;
    }
  }

  static async addCarToUser(carDto: CarCreateDto, user: IUser) {
    try {
      // await api.post(`/user/${user.id}/cars`, carDto);
      // пример - рандомный id, пока API не реализовано:
      // const newCar: ICar = { ...carDto, id: Math.floor(Math.random() * 10000) + 1 };
      // возвращение обновленного пользователя
      // return { ...user, cars: [...(user.cars || []), newCar] };
    } catch (err) {
      console.warn("AddCarToUser error:", err);
      throw err;
    }
  }
}
