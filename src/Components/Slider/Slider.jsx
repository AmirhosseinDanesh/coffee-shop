import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Slider({ sliders }) {
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
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        {
          sliders.map(slider => (
            <SwiperSlide key={slider.id}>
              <img src={slider.src} alt={slider.alt}/>
            </SwiperSlide>
          ))
        }


      </Swiper>
    </>
  );
}
