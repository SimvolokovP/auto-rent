import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ICar } from "../models/ICar";

import "./MyCars.scss";
import MyCarItem from "../MyCarItem/MyCarItem";

import "swiper/scss/pagination";
import "swiper/scss/navigation";
import useUserStore from "../../store/useUserStore";

interface MyCarsProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setCarIdToEdit: (n: number) => void
}

const MyCars: FC<MyCarsProps> = ({ isEditModalOpen, setIsEditModalOpen, setCarIdToEdit }) => {
  const [carsList, setCarsList] = useState<ICar[]>([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    if (currentUser?.cars && currentUser.cars.length) {
      setCarsList(currentUser.cars);
    }
  }, [currentUser]);

  return (
    <>
      {carsList && carsList.length ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          navigation
          pagination={{ clickable: true, type: "fraction" }}
        >
          {carsList.map((car) => (
            <SwiperSlide key={car.id}>
              <MyCarItem
                car={car}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setCarIdToEdit={setCarIdToEdit}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="my-cars__no">no cars available</div>
      )}
    </>
  );
};

export default MyCars;
