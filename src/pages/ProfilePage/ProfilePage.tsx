import { useState } from "react";
import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import DateTimePicker from "../../UI/DateTimePicker/DateTimePicker";
import Header from "../../components/Header/Header";

const ProfilePage = () => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  const handleDateTimeChange = ({ date, time }) => {
    setDateTime({ date, time });
    console.log("Selected:", date, time);
  };

  return (
    <AnimatedBlock>
      <div className="page profile-page">
        <div className="container profile-page__container">
          <Header />
          <DateTimePicker onChange={(data) => handleDateTimeChange(data)} />
          <p>
            Текущий выбор: {dateTime.date} {dateTime.time}
          </p>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProfilePage;
