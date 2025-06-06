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

import "./CarAddForm.scss";
import { useAlert } from "../../UI/Alert";
import {
  carsOptions,
  carsPopularBrands,
  carsYears,
} from "../../helpers/carForm";

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

  const { alert } = useAlert();

  // const handleChange = (value: TCarType) => {
  //   console.log("Selected value:", value);
  //   setType(value);
  // };

  const onSubmit = async (car: CarCreateDto) => {
    try {
      car = { ...car, brand, year: `${year}-01-01`, car_type: type };
      console.log(car);
      await addCarToUser(car);
      reset();
      setBrand("");
      setYear("");
      alert({
        title: "Notify",
        message: "Car added!",
        autoClose: true,
        type: "success",
        isCloseBtn: true,
      });
    } catch (error: any) {
      alert({
        message: error || "Server Error",

        title: "Error",
        type: "error",
        autoClose: true,
        delay: 100,
      });
      console.warn(error);
    }
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
          data={carsPopularBrands}
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
          data={carsYears}
          icon={PiTimer}
          onChangeCustom={(v) => setYear(v)}
          validation={{
            required: "Required field",
          }}
        />

        <Select
          setValue={setValue}
          name="car_type"
          register={register}
          options={carsOptions}
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
