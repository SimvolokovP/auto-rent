import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./Calendar.module.scss";
import { PiArrowLeftLight, PiArrowRightLight } from "react-icons/pi";

const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const getMonthData = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();

  let startWeekDay = firstDayOfMonth.getDay();
  if (startWeekDay === 0) startWeekDay = 7;

  const daysArray = [];

  for (let i = 1; i < startWeekDay; i++) {
    daysArray.push({ label: "", value: null, disabled: true });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push({
      label: day.toString(),
      value: new Date(year, month, day),
      disabled: false,
    });
  }

  return daysArray;
};

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const Calendar: FC<CalendarProps> = ({ setSelectedDate, selectedDate }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const monthData = getMonthData(year, month);

  const handlePrevMonth = () => {
    setYear((prevYear) => {
      let newYear = prevYear;
      let newMonth = month - 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      setMonth(newMonth);
      return newYear;
    });
  };

  const handleNextMonth = () => {
    setYear((prevYear) => {
      let newYear = prevYear;
      let newMonth = month + 1;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      setMonth(newMonth);
      return newYear;
    });
  };

  const handleDayClick = (day: {
    label: string;
    value: Date | null;
    disabled: boolean;
  }) => {
    if (!day.disabled && day.value) {
      setSelectedDate(day.value);
    }
  };

  const displayMonthYear = new Date(year, month).toLocaleString("en-En", {
    month: "long",
    year: "numeric",
  });

  const nowDateStart = new Date();
  nowDateStart.setHours(0, 0, 0, 0);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button type="button" className="btn-reset" onClick={handlePrevMonth}>
          <PiArrowLeftLight size={24} />
        </button>
        <div>{displayMonthYear}</div>
        <button type="button" className="btn-reset" onClick={handleNextMonth}>
          <PiArrowRightLight size={24} />
        </button>
      </div>

      <div className={styles.weekDays}>
        {WEEK_DAYS.map((day, index) => (
          <div key={index} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {monthData.map((day, index) => {
          const date = day.value;
          const isPast = date && date < nowDateStart;

          const isToday =
            date && date.toDateString() === new Date().toDateString();

          const isSelected =
            date &&
            selectedDate &&
            date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              className={`${styles.dayCell} ${
                day.disabled ? styles.disabled : ""
              } ${isToday ? styles.today : ""} ${isPast ? styles.past : ""} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => !day.disabled && !isPast && handleDayClick(day)}
              style={{
                cursor: day.disabled || isPast ? "not-allowed" : "pointer",
                opacity: day.disabled || isPast ? 0.5 : 1,
                backgroundColor: isSelected
                  ? "var(--calendar-active)"
                  : undefined,
                color: isSelected ? "#fff" : undefined,
              }}
            >
              {day.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
