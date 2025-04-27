import GreetingBlock from "../../components/GreetingBlock/GreetingBlock";
import MainPageNavigation from "../../components/MainPageNavigation/MainPageNavigation";
import Button from "../../UI/Button/Button";

import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="page main-page">
      <GreetingBlock />
      <div className="container main-page__container">
        <div className="main-page__top">
          <MainPageNavigation />
        </div>
        <div className="main-page__bottom">
          <Button stretched mode="filled">
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
