import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FC, useEffect, useState } from "react";
import { ICar } from "../models/ICar";

import "./MyCars.scss";
import MyCarItem from "../MyCarItem/MyCarItem";

import "swiper/scss/pagination";
import useUserStore from "../../store/useUserStore";

interface MyCarsProps {}

const MyCars: FC<MyCarsProps> = () => {
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
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {carsList.map((car) => (
            <SwiperSlide key={car.id}>
              <MyCarItem car={car} />
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
