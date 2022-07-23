import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "./card"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style/carrossel.css";

// import required modules
import { Pagination, Navigation,Autoplay } from "swiper";

export default function Carrossel() {
   
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        navigation={false}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Card/></SwiperSlide>
         <SwiperSlide><Card/></SwiperSlide>
          <SwiperSlide><Card/></SwiperSlide>
           <SwiperSlide><Card/></SwiperSlide>
            <SwiperSlide><Card/></SwiperSlide>
             <SwiperSlide><Card/></SwiperSlide>
       
      </Swiper>
    </>
  );
}