import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Slider from "../../../Components/Slider/Slider"
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import { DataUrlV1 } from '../../../Data/Data'
import ProductCart from '../../../Components/ProductCart/ProductCart'

export default function CategoryInfo() {
    const [categoryProducts, setCategoryProducts] = useState([])
    const { categoryName } = useParams()
    useEffect(() => {
        fetch(`${DataUrlV1}/courses/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                setCategoryProducts(data)
            })
    }, [categoryName])
    return (
        <>
            <Header />
            <Slider sliders={[{ id: 1, src: `/images/sliders/${categoryName}.jpg`, alt: "قهوه فوری" }]} />
            <div className='mt-10 md:p-10'>
                <div className='font-DanaBold text-3xl text-center border-b-2 pb-8 mb-10 dark:text-gray-300'>
                    محصولات دسته بندی {categoryName}
                </div>
                <div className='flex flex-wrap p-4 justify-center md:justify-around gap-x-1'>
                    {

                        (categoryProducts.length ? (
                            categoryProducts.map((pro) => (
                                <ProductCart key={pro._id} {...pro} />
                            ))
                        ) : (
                            <>
                                <div className='bg-gray-700 w-full p-3 rounded-xl text-center text-white'>
                                    محصولی برای نمایش وجود ندارد.
                                </div>
                            </>
                        )
                        )

                        //     articles.map((art) => (
                        // <Article {...art} />
                        // ))
                    }
                </div>
            </div>

        </>
    )
}
