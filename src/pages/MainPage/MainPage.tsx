import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import Header from "../../components/Header/Header";
import MainPageNavigation from "../../components/MainPageNavigation/MainPageNavigation";

import Button from "../../UI/Button/Button";

import "./MainPage.scss";

const MainPage = () => {
  return (
    <AnimatedBlock>
      <Header />
      <div className="page main-page">
        {/* <GreetingBlock /> */}
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
    </AnimatedBlock>
  );
};

export default MainPage;
