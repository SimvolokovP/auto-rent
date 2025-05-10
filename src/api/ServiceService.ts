import { AxiosResponse } from "axios";
import { IService } from "../components/models/IService";
import { authHost } from ".";

export class ServiceService {
  static async getAll(): Promise<AxiosResponse<IService[]>> {
    try {
      const response = await authHost.get("/services/");
      return response;
    } catch (err) {
      console.warn("get services error:", err);
      throw err;
    }
  }

}
