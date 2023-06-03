import React from 'react'

import Slider from '../../Components/Slider/Slider'
export default function Index() {
  return (
    <>
      <Slider sliders={[
        { id: 1, src: "/images/sliders/headerBgDesktop.png", alt: "قهوه ناب فرانسوی" },
      ]} />
    </>
  )
}
