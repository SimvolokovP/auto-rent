import { Dispatch, FC, SetStateAction } from "react";
import { ICar } from "../models/ICar";

import "./MyCarItem.scss";
import { PiBusFill, PiClockFill, PiPenFill, PiTrashFill } from "react-icons/pi";
import { useAlert } from "../../UI/Alert";

interface MyCarItemProps {
  car: ICar;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setCarIdToEdit: (n: number) => void;
}

const MyCarItem: FC<MyCarItemProps> = ({
  car,
  setIsEditModalOpen,
  setCarIdToEdit,
}) => {
  const { alert } = useAlert();

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setCarIdToEdit(car.id);
  };

  const handleDelete = () => {
    console.log("deleet" + car.id);
  };

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
        <div className="my-car-item__action" onClick={handleEdit}>
          <span>
            <PiPenFill size={20} />
          </span>
        </div>
        <div
          className="my-car-item__action"
          onClick={() =>
            alert({
              title: "Delete?",
              message: "Delete?",
              autoClose: false,
              isCloseBtn: true,
              type: "warn",
              actions: [
                {
                  text: "No",
                },
                {
                  text: "Yes",
                  callback: () => {
                    handleDelete();
                  },
                },
                {
                  text: "Maybe",
                },
                {
                  text: "Of cousre",
                  callback: () => {
                    handleDelete();
                  },
                },
                {
                  text: "Hm",
                },
                {
                  text: "Good",
                  callback: () => {
                    handleDelete();
                  },
                },
                {
                  text: "Ok",
                },
                {
                  text: "Nice",
                  callback: () => {
                    handleDelete();
                  },
                },
              ],
            })
          }
        >
          <span>
            <PiTrashFill size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyCarItem;
