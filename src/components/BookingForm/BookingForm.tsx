import { useState } from "react";
import DateTimePicker from "../../UI/DateTimePicker/DateTimePicker";

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const label = `${hour.toString().padStart(2, "0")}:00`;
    times.push({ label, value: label });
  }
  return times;
};

const getCarsOptions = (cars: ICar[]) => {
  return cars.map((car) => ({ label: car.name, value: car.id }));
};

import "./BookingForm.scss";
import { useForm } from "react-hook-form";
import { RecordCreateDto } from "../models/dtos/RecordCreateDto.dto";
import { useAlert } from "../../UI/Alert";
import Input from "../../UI/Input/Input";
import Select from "../../UI/Select/Select";
import useUserStore from "../../store/useUserStore";
import { ICar } from "../models/ICar";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import CarAddForm from "../CarAddForm/CarAddForm";
import ServicesTab from "../ServicesTab/ServicesTab";

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm<RecordCreateDto>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const timeOptions = generateTimeOptions();

  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );

  const { currentUser, isLoading, createRecord } = useUserStore();

  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState<boolean>(false);

  const { alert } = useAlert();

  const onSubmit = async (record: RecordCreateDto) => {
    try {
      if (selectedCarId && selectedDate && selectedTime && selectedServiceId) {
        const date = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(":").map(Number);
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        const recordingDateISO = date.toISOString();
        record = {
          ...record,
          car: selectedCarId,

          service: selectedServiceId,
          recording_date: recordingDateISO,
        };

        await createRecord(record);
        alert({
          title: "Notify",
          message: "Record added!",
          autoClose: true,
          type: "success",
          isCloseBtn: true,
        });
        reset();
        setSelectedDate(null);
        setSelectedServiceId(null);
        setSelectedTime("");
      } else {
        alert({
          message: "Please, choose date&time and service",
          title: "Error",
          type: "error",
          autoClose: true,
          delay: 100,
        });
      }
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
    <div className="booking-form-container">
      {/* <div className="booking-form-title">Booking</div> */}
      <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="first_name"
          placeholder="first name"
          type="text"
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
          }}
        />
        <Input
          name="last_name"
          placeholder="last name"
          type="text"
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
          }}
        />

        <Input
          name="description"
          placeholder="description"
          type="text"
          register={register}
          errors={errors}
        />

        <div className="booking-form__label">
          <Select
            setValue={setValue}
            name="car"
            register={register}
            options={getCarsOptions(currentUser?.cars || [])}
            placeholder="Choose a car..."
            onChangeCustom={(v) => setSelectedCarId(v)}
            validation={{
              required: "Required field",
            }}
            errors={errors}
          />
          <span>OR</span>
          <Button
            onClick={() => setIsAddCarModalOpen(true)}
            type="button"
            size="l"
          >
            +
          </Button>
        </div>

        <ServicesTab
          currentService={selectedServiceId}
          setCurrentService={setSelectedServiceId}
        />

        <DateTimePicker
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          timeOptions={timeOptions}
          setSelectedTime={setSelectedTime}
          setSelectedDate={setSelectedDate}
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
      <Modal open={isAddCarModalOpen} setOpen={setIsAddCarModalOpen}>
        <CarAddForm />
      </Modal>
    </div>
  );
};

export default BookingForm;
