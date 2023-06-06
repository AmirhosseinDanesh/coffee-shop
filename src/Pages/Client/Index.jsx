import React from 'react'
import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
export default function Index() {
  return (
    <>
      <Header />
      <Slider sliders={[
        { id: 1, src: "/images/sliders/1.png", alt: "قهوه ناب فرانسوی" }
      ]} />
    </>
  )
}
