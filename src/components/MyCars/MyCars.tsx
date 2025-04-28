import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FC } from "react";
import { ICar } from "../models/ICar";

import "./MyCars.scss";
import MyCarItem from "../MyCarItem/MyCarItem";

import "swiper/scss/pagination";

interface MyCarsProps {}

const carsList: ICar[] = [
  { brand: "GR", id: 1, name: "Fortuner GR", year: "2012", type: "hatchback" },
  { brand: "GR", id: 2, name: "Fortuner GD", year: "2012", type: "sedan" },
];

const MyCars: FC<MyCarsProps> = () => {
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
        <div>no cars available</div>
      )}
    </>
  );
};

export default MyCars;
