import { useState } from "react";

import Button from "../../UI/Button/Button";
import "./GreetingBlock.scss";

const GreetingBlock = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      {isOpen && (
        <div className="greeting-block">
          <img src="./images/hero.png" alt="hero" />
          <div className="greeting-block__content">
            <h3 className="greeting-block__title">
              Premium cars. <br /> Enjoy the luxury
            </h3>
            <p className="greeting-block__text">
              Premium and prestige car daily rental. <br /> Experience the
              thrill at a lower price
            </p>
            <Button
              size="l"
              mode="bezeled"
              stretched
              onClick={() => setIsOpen(false)}
            >
              Let's Go!
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default GreetingBlock;
