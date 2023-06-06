import React from 'react'
import Slider from "../../../Components/Slider/Slider"
import Header from '../../../Components/Header/Header'
export default function Shop() {
    return (
        <>
            <Header />
            <Slider sliders={[{ id: 1, src: "/images/sliders/2.jpg", alt: "قهوه ناب فرانسوی" }]} />
        </>
    )
}
