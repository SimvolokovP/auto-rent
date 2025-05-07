type TCarType = "hatchback" | "minivan" | "sedan";

export interface CarCreateDto {
  name: string;
  year: string;
  brand: string;
  car_type: TCarType;
}
