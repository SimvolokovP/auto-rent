import { useState } from "react";
import Button from "../../UI/Button/Button";
import AnimatedBlock from "../AnimatedBlock/AnimatedBlock";
import MyCars from "../MyCars/MyCars";
import ProfileLink from "../ProfileLink/ProfileLink";
import UserPoints from "../UserPoints/UserPoints";
import "./MainPageNavigation.scss";
import Modal from "../../UI/Modal/Modal";

const MainPageNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <AnimatedBlock>
      <div className="main-navigation">
        <div className="main-navigation__item main-navigation__item--large">
          <>
            <div className="main-navigation-item__chapter">My cars</div>
            <Button size="s">+</Button>
            <MyCars />
          </>
        </div>
        <div className="main-navigation__item">
          <ProfileLink />
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          className="main-navigation__item"
        >
          <UserPoints />
        </div>
      </div>
      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        <div>content</div>
      </Modal>
    </AnimatedBlock>
  );
};

export default MainPageNavigation;
