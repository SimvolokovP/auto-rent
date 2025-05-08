import { Link } from "react-router-dom";
import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import BookingForm from "../../components/BookingForm/BookingForm";
import Header from "../../components/Header/Header";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

import './BookingPage.scss';

const BookingPage = () => {
  return (
    <AnimatedBlock>
      <div className="page booking-page">
        <div className="container booking-page__container">
          <Header />
          <div className="booking-page__breadcrumb">
            <Breadcrumb
              items={[
                { title: <Link to="/">Home</Link> },
                { title: <Link to="/book">Book</Link> },
              ]}
            />
          </div>
          <BookingForm />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default BookingPage;
