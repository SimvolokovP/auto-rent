import styles from "./DateTimePicker.module.scss";
import Calendar from "../../components/Calendar/Calendar";
import { Dispatch, FC, SetStateAction } from "react";

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string;
  timeOptions: any[];
  setSelectedTime: (s: string) => void;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const DateTimePicker: FC<DateTimePickerProps> = ({
  selectedDate,
  selectedTime,
  timeOptions,
  setSelectedTime,
  setSelectedDate,
}) => {
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
