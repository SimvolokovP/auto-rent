import { FC } from "react";
import { ICar } from "../models/ICar";

import "./MyCarItem.scss";

interface MyCarItemProps {
  car: ICar;
}

const MyCarItem: FC<MyCarItemProps> = ({ car }) => {
  return (
    <div className="my-car-item">
      <div className="my-car-item__image">
        <img src="./images/car.png" alt="car" />
      </div>
      <div className="my-car-item__title">{car.name}</div>
      <div className="my-car-item__title">{car.brand}</div>
    </div>
  );
};

export default MyCarItem;
