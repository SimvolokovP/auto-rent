import { AxiosResponse } from "axios";
import { authHost } from ".";
import { IRecord } from "../components/models/IRecord";
import { RecordCreateDto } from "../components/models/dtos/RecordCreateDto.dto";

export class RecordService {
  static async getAll(): Promise<AxiosResponse<IRecord[]>> {
    try {
      const response = await authHost.get("/record/");
      return response;
    } catch (err) {
      console.warn("get record error:", err);
      throw err;
    }
  }

  static async createRecord(
    recordDto: RecordCreateDto
  ): Promise<AxiosResponse<IRecord>> {
    try {
      const {
        first_name,
        last_name,
        description,
        car,
        recording_date,
        service,
      } = recordDto;
      const response = await authHost.post("/record/", {
        first_name,
        last_name,
        description,
        car,
        recording_date,
        service,
      });
      return response;
    } catch (err) {
      console.warn("add record error:", err);
      throw err;
    }
  }
}
