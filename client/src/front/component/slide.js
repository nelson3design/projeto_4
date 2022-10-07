import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style/slide.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";

export default function Slide() {
  return (
    <>
      <Swiper
      
        loop={true}
        cssMode={true}
        navigation={false}
        pagination={true}
        mousewheel={true}
        keyboard={true}
         loopFillGroupWithBlank={true}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"
        id="bannerDesktop"
      >
        <SwiperSlide><img src={require('./assets/img_1.png')} alt="imag_1"/></SwiperSlide>
        <SwiperSlide><img src={require('./assets/img_2.png')} alt="imag_2"/></SwiperSlide>
        <SwiperSlide><img src={require('./assets/img_3.png')} alt="imag_3"/></SwiperSlide>

       
       
      </Swiper>


      <Swiper
      
        loop={true}
        cssMode={true}
        navigation={false}
        pagination={true}
        mousewheel={true}
        keyboard={true}
         loopFillGroupWithBlank={true}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"
        id="bannerMobile"
      >
       
        <SwiperSlide><img src={require('./assets/banner-1-mobile.png')} alt="imag_1"/></SwiperSlide>
        <SwiperSlide><img src={require('./assets/banner-2-mobile.png')} alt="imag_2"/></SwiperSlide>
        <SwiperSlide><img src={require('./assets/banner-3-mobile.png')} alt="imag_3"/></SwiperSlide>
       
      </Swiper>
    </>
  );
}
