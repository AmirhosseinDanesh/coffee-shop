import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
import { SwiperSlide } from 'swiper/react'
export default function Index() {
  useEffect(() => {
    let docTitle = document.title
    window.addEventListener("blur", () => [
      document.title = "بیا همینجا ، نرو جای دیگه :)"
    ])
    window.addEventListener("focus", () => [
      document.title = docTitle
    ])
  }, [])
  return (
    <>
      <Header />
      <Slider >
        <SwiperSlide >
          <div className={`bg-[url('/images/sliders/1.png')] bg-no-repeat`}>
            <div className="container md:min-h-screen flex justify-end items-center text-white">
              <>
                <div>
                  <h2 className="font-MorabbaBold text-2xl md:text-6xl mb-0.5 md:mb-7">قهوه عربیکا تانزانیکا</h2>
                  <span className="font-MorabbaLight text-xl md:text-5xl ">یک فنجان بالانس</span>
                  <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-7"></span>
                  <h2 className="max-w-[201px] md:max-w-[400px] text-xs md:text-2xl">قطعا نام آشنای عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشت میشود.</h2>
                </div>
              </>
            </div>
          </div>
        </SwiperSlide>
      </Slider>
    </>
  )
}
