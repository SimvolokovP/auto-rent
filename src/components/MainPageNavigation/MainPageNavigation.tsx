import { useState } from "react";
import Button from "../../UI/Button/Button";
import MyCars from "../MyCars/MyCars";
import ProfileLink from "../ProfileLink/ProfileLink";
import UserPoints from "../UserPoints/UserPoints";
import "./MainPageNavigation.scss";
import Modal from "../../UI/Modal/Modal";
import AutoComplete from "../../UI/AutoComplete/AutoComplete";
import { useForm } from "react-hook-form";
import { PiCarFill, PiCarLight } from "react-icons/pi";

const popularCarBrands = [
  "Toyota",
  "Lada",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Renault",
  "Mazda",
  "Nissan",
  "Chevrolet",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Skoda",
  "Lexus",
  "Jaguar",
  "Subaru",
  "Porsche",
  "Dacia",
  "Suzuki",
  "Mitsubishi",
  "Ferrari",
  "Porsche",
  "Bentley",
  "Rolls-Royce",
  "Land Rover",
  "Jaguar",
  "Chery",
  "Geely",
  "Haval",
  "UAZ",
  "GAZ",
  "ZAZ",
  "Vaz",
];

const MainPageNavigation = () => {
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);

  const [mark, setMark] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

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
        <div>Car add form</div>
        <AutoComplete
          data={popularCarBrands}
          name=""
          placeholder="Mark of Auto"
          register={register}
          icon={PiCarLight}
          onChangeCustom={(s: string) => setMark(s)}
        />
        <button onClick={() => console.log(mark)}>ok</button>
      </Modal>
    </div>
  );
};

export default MainPageNavigation;
