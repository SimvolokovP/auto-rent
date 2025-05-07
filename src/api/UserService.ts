import { AxiosResponse } from "axios";

import { CarCreateDto } from "../components/models/dtos/CarCreateDto.dto";
import { UserLoginDto } from "../components/models/dtos/UserLogin.dto";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";
import { IProfile, IUser } from "../components/models/IUser";
import { AuthResponse } from "../components/models/response/AuthResponse";
import { authHost, host } from ".";
import { ICar } from "../components/models/ICar";

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

  static async addCarToUser(
    carDto: CarCreateDto
  ): Promise<AxiosResponse<ICar>> {
    try {
      console.log(carDto);
      const { brand, car_type, name, year } = carDto;
      const response = await authHost.post("/car/", {
        brand,
        car_type,
        name,
        year,
      });
      return response;
    } catch (err) {
      console.warn("Car add error:", err);
      throw err;
    }
  }

  static async deleteCarFromUser(carId: number): Promise<AxiosResponse<ICar>> {
    try {
      const response = await authHost.delete(`/car/${carId}/`);
      return response;
    } catch (err) {
      console.warn("Car add error:", err);
      throw err;
    }
  }
}
