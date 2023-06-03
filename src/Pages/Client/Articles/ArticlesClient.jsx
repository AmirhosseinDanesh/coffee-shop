import React from 'react'
import Slider from '../../../Components/Slider/Slider'

export default function ArticlesClient() {
  return (
    <>
      <Slider sliders={[
        { id: 1, src: "/images/sliders/3.jpg", alt: "قهوه فوری" },
      ]} />
    </>
  )
}
