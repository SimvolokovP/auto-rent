import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import AutoComplete from "../../UI/AutoComplete/AutoComplete";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import { PiCarLight, PiCarProfile, PiTimer } from "react-icons/pi";
import { CarCreateDto } from "../models/dtos/CarCreateDto.dto";
import useUserStore from "../../store/useUserStore";

const popularCarBrands = [
  "Toyota",
  "Lada",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Renault",
  "Mazda",
  "Nissan",
  "Chevrolet",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Skoda",
  "Lexus",
  "Jaguar",
  "Subaru",
  "Porsche",
  "Dacia",
  "Suzuki",
  "Mitsubishi",
  "Ferrari",
  "Porsche",
  "Bentley",
  "Rolls-Royce",
  "Land Rover",
  "Jaguar",
  "Chery",
  "Geely",
  "Haval",
  "UAZ",
  "GAZ",
  "ZAZ",
  "Vaz",
];

const years = ["2025", "2024", "2023"];

const CarAddForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<CarCreateDto>();

  const { isLoading, addCarToUser } = useUserStore();

  const [brand, setBrand] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const onSubmit = async (car: CarCreateDto) => {
    car = { ...car, brand, year, type: "hatchback" };
    console.log(car);
    addCarToUser(car);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <Input
          name="name"
          placeholder="Name"
          type="text"
          icon={PiCarProfile}
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
          }}
        />

        <AutoComplete
          name="brand"
          placeholder="brand"
          register={register}
          errors={errors}
          data={popularCarBrands}
          icon={PiCarLight}
          onChangeCustom={(v) => setBrand(v)}
        />

        <AutoComplete
          name="year"
          placeholder="Year"
          register={register}
          errors={errors}
          data={years}
          icon={PiTimer}
          onChangeCustom={(v) => setYear(v)}
        />

        <Button
          size="l"
          mode="filled"
          stretched
          type="submit"
          isLoading={isLoading}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default CarAddForm;
