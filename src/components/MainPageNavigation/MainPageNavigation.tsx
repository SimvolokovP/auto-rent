import { useState } from "react";
import Button from "../../UI/Button/Button";
import MyCars from "../MyCars/MyCars";
import ProfileLink from "../ProfileLink/ProfileLink";
import UserPoints from "../UserPoints/UserPoints";
import "./MainPageNavigation.scss";
import Modal from "../../UI/Modal/Modal";
import CarAddForm from "../CarAddForm/CarAddForm";

const MainPageNavigation = () => {
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);

  return (
    <div className="main-navigation">
      <div className="main-navigation__item main-navigation__item--large">
        <>
          <div className="main-navigation-item__chapter">My cars</div>
          <Button onClick={() => setIsCarModalOpen(true)} size="s">
            +
          </Button>
          <MyCars />
        </>
      </div>
      <div className="main-navigation__item">
        <ProfileLink />
      </div>
      <div className="main-navigation__item">
        <UserPoints />
      </div>
      <Modal open={isCarModalOpen} setOpen={setIsCarModalOpen}>
        <CarAddForm />
      </Modal>
    </div>
  );
};

export default MainPageNavigation;
