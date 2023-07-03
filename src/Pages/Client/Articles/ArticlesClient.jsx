import React, { useEffect, useState } from 'react'
import Slider from '../../../Components/Slider/Slider'
import ArticleCart from '../../../Components/ArticleCart/ArticleCart'
import { DataUrlV1 } from "../../../Data/Data"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../../../Components/Header/Header'
import { SwiperSlide } from 'swiper/react'

export default function ArticlesClient() {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch(`${DataUrlV1}/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [])
  return (
    <>
      <Header />
      <Slider >
        <SwiperSlide className='overflow-y-visible' >
          <div className="bg-slide-2-D md:bg-slide-2-D relative xs:h-auto xs:aspect-[2/1] h-[250px] bg-no-repeat bg-cover bg-[center_top]">
            <div className="container relative overflow-y-hidden h-full md:min-h-screen flex justify-end items-center text-white">
              <div className=''>
                {/* <h2 className="font-MorabbaBold text-2xl md:text-6xl mb-0.5 md:mb-7">قهوه عربیکا تانزانیکا</h2>
                <span className="font-MorabbaLight text-xl md:text-5xl ">یک فنجان بالانس</span>
                <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-7"></span>
                <h2 className="max-w-[201px] md:max-w-[400px] text-xs md:text-2xl">قطعا نام آشنای عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشت میشود.</h2> */}
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
      <div className='mt-10 md:p-10'>
        <div className='font-DanaBold text-3xl text-center border-b-2 pb-8 mb-10 dark:text-gray-300'>
          آخرین مقالات
        </div>
        <div className='flex flex-wrap p-4 justify-center md:justify-around gap-x-1'>
          {

            (articles.length ? (
              articles.filter(article => article.publish == 1).map((art) => (
                <ArticleCart key={art._id} {...art} />
              ))
            ) : (
              <>
                <div className="max-w-sm basis-1/4 border rounded-lg shadow">
                  <Skeleton animation="wave" height={200} />
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 ">
                        <Skeleton animation="wave" />
                      </h5>
                    </a>
                    <p className="mb-3">
                      <Skeleton animation="wave" count={2} />
                    </p>
                    <span href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 cursor-not-allowed rounded-lg   dark:bg-blue-400  ">
                      ادامه مطلب
                      <svg aria-hidden="true" className="w-4 h-4 mr-4 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </span>
                  </div>
                </div>
                <div className="max-w-sm basis-1/4 border rounded-lg shadow">
                  <Skeleton animation="wave" height={200} />
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 ">
                        <Skeleton animation="wave" />
                      </h5>
                    </a>
                    <p className="mb-3">
                      <Skeleton animation="wave" count={2} />
                    </p>
                    <span href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 cursor-not-allowed rounded-lg   dark:bg-blue-400  ">
                      ادامه مطلب
                      <svg aria-hidden="true" className="w-4 h-4 mr-4 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </span>
                  </div>
                </div>
                <div className="max-w-sm basis-1/4 border rounded-lg shadow">
                  <Skeleton animation="wave" height={200} />
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 ">
                        <Skeleton animation="wave" />
                      </h5>
                    </a>
                    <p className="mb-3">
                      <Skeleton animation="wave" count={2} />
                    </p>
                    <span href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 cursor-not-allowed rounded-lg   dark:bg-blue-400  ">
                      ادامه مطلب
                      <svg aria-hidden="true" className="w-4 h-4 mr-4 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </span>
                  </div>
                </div>
              </>
            )
            )

            // articles.map((art) => (
            //   <Article {...art} />
            // ))
          }
        </div>
      </div>
    </>
  )
}
