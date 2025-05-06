import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import AutoComplete from "../../UI/AutoComplete/AutoComplete";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import { PiCarLight, PiCarProfile, PiTimer } from "react-icons/pi";
import { CarCreateDto } from "../models/dtos/CarCreateDto.dto";
import useUserStore from "../../store/useUserStore";
import Select from "../../UI/Select/Select";
import { TCarType } from "../models/ICar";

import './CarAddForm.scss';

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

const options = [
  { label: "Hatchback", value: "hatchback" },
  { label: "Sedan", value: "sedan" },
  { label: "Minivan", value: "minivan" },
];

const years = ["2025", "2024", "2023"];

const CarAddForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm<CarCreateDto>();

  const { isLoading, addCarToUser } = useUserStore();

  const [brand, setBrand] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<TCarType>("hatchback");

  // const handleChange = (value: TCarType) => {
  //   console.log("Selected value:", value);
  //   setType(value);
  // };

  const onSubmit = async (car: CarCreateDto) => {
    car = { ...car, brand, year, type };
    console.log(car);
    await addCarToUser(car);
    reset();
    setBrand("");
    setYear("");
  };

  return (
    <div className="car-form-container">
      <div className="car-form-title">Add Car</div>
      <form onSubmit={handleSubmit(onSubmit)} className="car-form">
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
          validation={{
            required: "Required field",
          }}
        />

        <AutoComplete
          name="year"
          placeholder="Year"
          register={register}
          errors={errors}
          data={years}
          icon={PiTimer}
          onChangeCustom={(v) => setYear(v)}
          validation={{
            required: "Required field",
          }}
        />

        <Select
          setValue={setValue}
          name="type"
          register={register}
          options={options}
          placeholder="Choose a type..."
          onChangeCustom={(v) => setType(v)}
          validation={{
            required: "Required field",
          }}
          errors={errors}
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
