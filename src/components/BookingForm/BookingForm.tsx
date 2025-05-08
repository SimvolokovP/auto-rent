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

import "./BookingForm.scss";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const timeOptions = generateTimeOptions();

  return (
    <div className="booking-form-container">
      {/* <div className="booking-form-title">Booking</div> */}
      <form>
        <DateTimePicker
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          timeOptions={timeOptions}
          setSelectedTime={setSelectedTime}
          setSelectedDate={setSelectedDate}
        />
        <p style={{ color: "var(--text-color)" }}>
          Selected date: {selectedTime}{" "}
          {selectedDate?.toLocaleDateString("ru-RU")}
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
