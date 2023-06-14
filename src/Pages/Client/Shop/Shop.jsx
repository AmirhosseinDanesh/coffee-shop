import React, { useEffect, useState } from 'react'
import Slider from "../../../Components/Slider/Slider"
import Header from '../../../Components/Header/Header'
import { DataUrlV1 } from '../../../Data/Data'
import ProductCart from "../../../Components/ProductCart/ProductCart"
export default function Shop() {
    const [allProducts, setAllProducts] = useState([])
    useEffect(() => {
        fetch(`${DataUrlV1}/courses`)
            .then(res => res.json())
            .then(data => setAllProducts(data))
    }, [])
    return (
        <>
            <Header />
            <Slider sliders={[{ id: 1, src: "/images/sliders/2.jpg", alt: "قهوه ناب فرانسوی" }]} />
            <div className='flex flex-wrap p-4 justify-center md:justify-around gap-x-1'>
                {
                    allProducts.map((pro) => (
                        <ProductCart key={pro._id} {...pro} />
                    ))
                }

            </div>
        </>
    )
}
