import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay , EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay , EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide><img src="/images/headerBgDesktop.png" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/images/main4.jpg" alt="" /></SwiperSlide>
        
      </Swiper>
    </>
  );
}
