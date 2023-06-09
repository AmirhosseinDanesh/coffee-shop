import React, { useEffect, useState, useRef } from 'react'

import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DataUrlV1 } from '../../Data/Data';
import { FreeMode, Pagination } from 'swiper';

import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
import ProductCart from "../../Components/ProductCart/ProductCart"
import ReactLoading from 'react-loading';

import 'swiper/css';
import 'swiper/css/free-mode';
export default function Index() {
  const [allProducts, setAllProducts] = useState([])
  const ref = useRef(null);


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
          <div className="bg-slide-1-M md:bg-slide-1-D relative xs:h-auto xs:aspect-[2/1] h-[250px] bg-no-repeat bg-cover bg-[center_top]">
            <div className="container relative overflow-y-hidden h-full md:min-h-screen flex justify-end items-center text-white">
              <div className=''>
                <h2 className="font-MorabbaBold text-2xl md:text-6xl mb-0.5 md:mb-7">قهوه عربیکا تانزانیکا</h2>
                <span className="font-MorabbaLight text-xl md:text-5xl ">یک فنجان بالانس</span>
                <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-7"></span>
                <h2 className="max-w-[201px] md:max-w-[400px] text-xs md:text-2xl">قطعا نام آشنای عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشت میشود.</h2>
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

            <div className='cursor-pointer hidden md:flex items-center justify-center absolute right-0 bottom-0 left-0 mx-auto translate-y-1/2 w-[30px] h-[30px] border-2 border-orange-300 rounded-full' onClick={() => {
              ref.current?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <svg className="w-4 h-4 text-zinc-700 dark:text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </SwiperSlide>
      </Slider>
      <section ref={ref} className='products-section pt-8 md:pt-20 lg:pt-48'>
        <div className='container'>
          {/* section Head */}
          <div className='flex justify-between items-center mb-5 md:mb-12'>
            <div className='text-zinc-700 dark:text-white'>
              <h3 className='text-2xl md:text-5xl font-MorabbaMedium '>جدیدترین محصولات</h3>
              <h6 className='text-lg md:text-3xl font-MorabbaLight md:mt-1.5 mt-0.5'>فرآوری شده از دانه قهوه</h6>
            </div>
            <NavLink className="flex items-center md:gap-x-1 text-base md:text-xl tracking-tightest text-orange-300 hover:bg-orange-300/20 pr-3 pl-1 h-10 rounded-lg transition-colors" to="/shop">
              <span className='hidden md:inline-block'>مشاهده همه محصولات</span>
              <span className='inline-block md:hidden'>مشاهده همه</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </NavLink>

          </div>

          {/* section body */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5'>
            {
              allProducts.length ? (
                allProducts.slice(0, 8).map((pro) => (
                  <ProductCart key={pro._id} {...pro} />
                ))
              ) : (
                <div className='flex w-full justify-center items-center text-center col-start-1 col-end-8 backdrop-blur-sm h-[200px] md:h-[400px]'>
                  <ReactLoading type={"bubbles"} color={"white"} height={75} width={75} />
                </div>
              )
            }
          </div>
        </div>
      </section>
      <section className='mt-8 mb-10 md:my-20'>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-white'>
            <NavLink to="/" className='category-baner1 flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]  '>
              <span className='font-DanaBold text-2xl/6  md:text-4xl/6 mb-4 md:mb-7'>انواع قهوه</span>
              <span className='md:font-DanaMedium  md:text-xl'>ترکیبی و پررو</span>
            </NavLink>
            <NavLink to="/" className='category-baner2 flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]  '>
              <span className='font-DanaBold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7'>پودر های فوری</span>
              <span className='md:font-DanaMedium  md:text-xl/6'>نسکافه ، هات چاکلت ،ماسالا</span>
            </NavLink>
          </div>
        </div>
      </section>
      <section className='product-category mb-20'>
        <div className="container">
          <Swiper
            // slidesPerView={4}
            breakpoints={{
              10:{
                slidesPerView: 2,
              },
              428: {
                slidesPerView: 3,
              },
              628: {
                slidesPerView: 4,
              },
              768:{
                slidesPerView : 5
              },
              1024 : {
                slidesPerView : 5,
              }
            }}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper2"
          >
            <SwiperSlide>
              <div className='w-24 md:w-52 text-center'>
                <img src="./images/categories/category1.png" alt="" />
                <span className='font-DanaBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5'>
                  قهوه دمی و اسپرسو
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-24 md:w-52 text-center'>
                <img src="./images/categories/category2.png" alt="" />
                <span className='font-DanaBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5'>
                  لوازم جانبی و تجهیزات
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-24 md:w-52 text-center'>
                <img src="./images/categories/category3.png" alt="" />
                <span className='font-DanaBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5'>
                  اسپرسو ساز
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-24 md:w-52 text-center'>
                <img src="./images/categories/category5.png" alt="" />
                <span className='font-DanaBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5'>
                  قهوه ترک
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-24 md:w-52 text-center'>
                <img src="./images/categories/category4.png" alt="" />
                <span className='font-DanaBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5'>
                  پک تستر قهوه
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-24 md:w-52 text-center'>
                <img src="./images/categories/category5.png" alt="" />
                <span className='font-DanaBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5'>
                  قهوه ترک
                </span>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </section>

    </>
  )
}
