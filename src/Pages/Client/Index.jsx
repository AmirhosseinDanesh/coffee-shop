import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
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
      <Slider sliders={[
        { id: 1, src: "/images/sliders/1.png", alt: "قهوه ناب فرانسوی" }
      ]} />
    </>
  )
}
