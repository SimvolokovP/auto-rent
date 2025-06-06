import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import AutoComplete from "../../UI/AutoComplete/AutoComplete";
import Button from "../../UI/Button/Button";
import { FC, useEffect, useState } from "react";
import { PiCarLight, PiCarProfile, PiTimer } from "react-icons/pi";
import { CarCreateDto } from "../models/dtos/CarCreateDto.dto";
import useUserStore from "../../store/useUserStore";
import Select from "../../UI/Select/Select";
import { ICar, TCarType } from "../models/ICar";

import { useAlert } from "../../UI/Alert";
import {
  carsOptions,
  carsPopularBrands,
  carsYears,
} from "../../helpers/carForm";

interface EditCarFormProps {
  carId: number | null;
}

const EditCarForm: FC<EditCarFormProps> = ({ carId }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CarCreateDto>();

  const { isLoading, editCarToUser, currentUser } = useUserStore();

  const [carToEdit, setCarToEdit] = useState<ICar | null>(null);

  const [brand, setBrand] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<TCarType>("hatchback");

  const { alert } = useAlert();

  const watchedFields = watch();

  useEffect(() => {
    const targetCar = currentUser?.cars.find((car) => car.id === carId);
    if (targetCar) {
      setCarToEdit(targetCar);
      reset({
        name: targetCar.name,
      });
      setValue("name", targetCar.name);
      setValue("brand", targetCar.brand);
      setValue("car_type", targetCar.car_type);
      setValue("year", targetCar.year ? targetCar.year.split("-")[0] : "");
      setBrand(targetCar.brand);
      setYear(targetCar.year ? targetCar.year.split("-")[0] : "");
      setType(targetCar.car_type);
    }
  }, [carId, currentUser, reset]);

  const isChanged =
    carToEdit &&
    (watchedFields.name !== getValues().name ||
      brand.toLowerCase() !== carToEdit.brand.toLowerCase() ||
      year !== (carToEdit.year ? carToEdit.year.split("-")[0] : "") ||
      type !== carToEdit.car_type);

  const onSubmit = async (car: CarCreateDto) => {
    try {
      if (carToEdit) {
        car = { ...car, brand, year: `${year}-01-01`, car_type: type };
        await editCarToUser(car, carToEdit.id);
        alert({
          title: "Notify",
          message: "Car updated!",
          autoClose: true,
          type: "success",
          isCloseBtn: true,
        });
      }
    } catch (error: any) {
      alert({
        message: error?.message ? error.message : "Error",
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
      <div className="car-form-title">Edit {carToEdit?.name}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="car-form">
        <Input
          defaultValue={carToEdit?.name ?? ""}
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
          targetValue={brand}
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
          targetValue={year}
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
          targetValue={type}
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
          disabled={!isChanged}
        >
          Edit
        </Button>
      </form>
    </div>
  );
};

export default EditCarForm;
