import { FC } from "react";
import { ICar } from "../models/ICar";

import "./MyCarItem.scss";
import { PiBusFill, PiClockFill } from "react-icons/pi";

interface MyCarItemProps {
  car: ICar;
}

const MyCarItem: FC<MyCarItemProps> = ({ car }) => {
  return (
    <div className="my-car-item">
      <div className="my-car-item__image">
        <img src={`./images/car.png`} alt="car" />
      </div>
      <div className="my-car-item__title">{car.name}</div>
      <div className="my-car-item__content">
        <div>
          <span>
            <PiBusFill size={20} />
          </span>
          <span>{car.brand}</span>
        </div>
        <div>
          <span>
            <PiClockFill size={20} />
          </span>
          <span>{car.year}</span>
        </div>
      </div>
    </div>
  );
};

export default MyCarItem;
