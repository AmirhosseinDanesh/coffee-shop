import React, { useEffect, useState } from 'react'
import Slider from '../../../Components/Slider/Slider'
import Header from '../../../Components/Header/Header'
import { SwiperSlide } from 'swiper/react'
import { DataUrlV1 } from '../../../Data/Data'
import { NavLink } from 'react-router-dom'
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
            <Slider >
                <SwiperSlide className='overflow-y-visible' >
                    <div className="bg-slide-3-D md:bg-slide-3-D relative xs:h-auto xs:aspect-[2/1] h-[250px] bg-no-repeat bg-cover bg-[center_top]">
                        <div className="container relative overflow-y-hidden h-full md:min-h-screen flex justify-start items-center text-white">
                            <div className=''>
                                <h2 className="font-MorabbaBold text-2xl md:text-6xl mb-0.5 md:mb-7">فروشگاه محصولات</h2>
                                {
                                    /* 
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
            </Slider>
            <div className='container'>
                {/* section Head */}
                <div className='flex justify-between items-center my-10 md:my-20 '>
                    <div className='text-zinc-700 dark:text-white'>
                        <h3 className='text-2xl md:text-5xl font-MorabbaMedium '>همه محصولات</h3>
                    </div>
                    <div className=''>
                        <select className="pl-16 px-px py-2 md:py-3 md:pl-32 rounded-md bg-black/50 dark:bg-zinc-700 text-white text-sm">
                            <option value="-1">فیلتر محصولات</option>
                            <option value="">گرانترین</option>
                            <option value="">ارزان ترین</option>
                        </select>
                    </div>

                </div>

                {/* section body */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 child:h-[200px]'>
                    {
                        allProducts.slice(0, 8).map((pro) => (
                            <ProductCart key={pro._id} {...pro} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
