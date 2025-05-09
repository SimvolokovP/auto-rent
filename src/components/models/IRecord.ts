import { IService } from "./IService";

type TRecordType = "P" | "A" | "R" | "C";

export interface IRecord {
  id: number;
  status: TRecordType;
  car: number;
  service: IService;
  first_name: string;
  last_name: string;
  description: string;
  recording_date: string;
  date_create: string;
}
