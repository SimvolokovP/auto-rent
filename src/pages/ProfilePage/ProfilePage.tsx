import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";

import Header from "../../components/Header/Header";
import BookingForm from "../../components/BookingForm/BookingForm";

const ProfilePage = () => {
  return (
    <AnimatedBlock>
      <div className="page profile-page">
        <div className="container profile-page__container">
          <Header />
          <BookingForm />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProfilePage;
