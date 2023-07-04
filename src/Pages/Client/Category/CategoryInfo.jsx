import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Slider from "../../../Components/Slider/Slider"
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import { DataUrlV1 } from '../../../Data/Data'
import ProductCart from '../../../Components/ProductCart/ProductCart'
import { SwiperSlide } from 'swiper/react'
export default function CategoryInfo() {
    const [categoryProducts, setCategoryProducts] = useState([])
    const { categoryName } = useParams()
    useEffect(() => {
        fetch(`${DataUrlV1}/courses/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                setCategoryProducts(data)
                console.log(data)
            })
    }, [categoryName])
    return (
        <>
            <Header />
            <SwiperSlide className='overflow-y-visible' >
                <div className="bg-slide-2-D md:bg-slide-2-D relative xs:h-auto xs:aspect-[2/1] h-[250px] bg-no-repeat bg-cover bg-[center_top]">
                    <div className="container relative overflow-y-hidden h-full md:min-h-screen flex justify-start items-center text-white">
                        <div className=''>
                            {
                                /* 
                                    <h2 className="font-MorabbaBold text-2xl md:text-6xl mb-0.5 md:mb-7">فروشگاه محصولات</h2>
                                    <span className="font-MorabbaLight text-xl md:text-5xl ">یک فنجان بالانس</span>
                                    <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-7"></span>
                                    <h2 className="max-w-[201px] md:max-w-[400px] text-xs md:text-2xl">قطعا نام آشنای عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشت میشود.</h2> 
                                */
                            }
                        </div>
                        {/* circles */}
                        <div className='absolute right-0 bottom-0 left-0 mx-auto translate-y-1/2 w-[203px] h-[203px]  rounded-full border border-white/25 hidden md:flex items-center justify-center'>
                            <div className='w-[145px] h-[145px] rounded-full border border-white/50 flex items-center justify-center'>
                                <div className='w-[95px] h-[95px] rounded-full border border-white/80 flex items-center justify-center'>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* svg */}
                    <svg className='absolute right-0 bottom-0 left-0 mx-auto text-gray-100 dark:text-zinc-800 w-[100px] h-[22px] hidden md:block' width="100" height="22" viewBox="0 0 100 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z" />
                    </svg>

                    <div className='hidden md:flex items-center justify-center absolute right-0 bottom-0 left-0 mx-auto translate-y-1/2 w-[30px] h-[30px] border-2 border-orange-300 rounded-full'>
                        <svg className="w-4 h-4 text-zinc-700 dark:text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </SwiperSlide>
            <div className='mt-10 md:p-10'>
                <div className='font-DanaBold text-base md:text-3xl text-center border-b-2 pb-8 mb-10 dark:text-gray-300'>
                    محصولات دسته بندی {categoryName}
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 container'>
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
