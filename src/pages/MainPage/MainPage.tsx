import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import Header from "../../components/Header/Header";
import MainPageNavigation from "../../components/MainPageNavigation/MainPageNavigation";

import Button from "../../UI/Button/Button";

import "./MainPage.scss";
import { useAlert } from "../../UI/Alert";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { logOut } = useUserStore();

  const { alert } = useAlert();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
  };

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
            <Button onClick={() => navigate("/book")} stretched mode="filled">
              Book
            </Button>

            <Button
              onClick={() =>
                alert({
                  title: "Log out",
                  message: `Do you want to log out?`,
                  autoClose: true,
                  isCloseBtn: true,
                  delay: 1200,
                  type: "warn",
                  actions: [
                    {
                      text: "No",
                    },
                    {
                      text: "Yes",
                      callback: () => {
                        handleLogOut();
                      },
                    },
                  ],
                })
              }
              mode="bezeled"
              stretched
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default MainPage;
