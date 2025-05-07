export type TCarType = "hatchback" | "minivan" | "sedan";

export interface ICar {
  id: number;
  name: string;
  year: string;
  brand: string;
  car_type: TCarType;
}
