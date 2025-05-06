import React, { useEffect, useState } from "react";
import styles from "./DateTimePicker.module.scss";
import Calendar from "../../components/Calendar/Calendar";

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const label = `${hour.toString().padStart(2, "0")}:00`;
    times.push({ label, value: label });
  }
  return times;
};

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const timeOptions = generateTimeOptions();

  useEffect(() => {
    console.log("TIME" + selectedTime);
    console.log("DATE" + selectedDate?.toLocaleDateString("ru-RU"));
  }, [selectedDate, selectedTime]);

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateSection}>
        <Calendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>
      <div className={styles.timeSection}>
        <div className={styles.timeList}>
          {timeOptions.map((time) => (
            <div
              key={time.value}
              className={`${styles.timeItem} ${
                selectedTime === time.value ? styles.active : ""
              }`}
              onClick={() => handleTimeChange(time.value)}
            >
              {time.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
