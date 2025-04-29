import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import MainPageNavigation from "../../components/MainPageNavigation/MainPageNavigation";
import ThemeButton from "../../components/ThemeButton/ThemeButton";
import Button from "../../UI/Button/Button";

import "./MainPage.scss";

const MainPage = () => {
  return (
    <AnimatedBlock>
      <div className="page main-page">
        {/* <GreetingBlock /> */}
        <div className="container main-page__container">
          <div className="main-page__top">
            <div className="main-page__theme">
              <div className="main-page__theme--container">
                <ThemeButton />
              </div>
            </div>
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
