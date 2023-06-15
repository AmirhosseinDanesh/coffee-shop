import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import { useParams } from 'react-router-dom'
import { DataUrl, DataUrlV1 } from '../../../Data/Data'
import DOMPurify from 'dompurify'
export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState([])
  const { shortName } = useParams()

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg className="w-5 h-5 text-yellow-500 hover:fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    );
  }

  useEffect(() => {
    fetch(`${DataUrlV1}/courses/${shortName}`)
      .then(res => res.json())
      .then(data => {
        setProductDetail(data)
      })
  }, [])
  return (
    <>
      <Header />
      <div className='md:mt-40 p-10 flex flex-col-reverse md:flex-row justify-around items-center'>
        <div className='basis-auto md:basis-1/2 text-gray-950 dark:text-white flex flex-col gap-y-5 mt-16 md:mt-0'>
          <div className='flex justify-between items-center '>
            <h2 className='text-2xl font-MorabbaMedium'>{productDetail.name}</h2>
            <span className='text-2xl'>{
              (productDetail.price) ? (productDetail.price.toLocaleString()) : ("")
              
            }
            <span className='text-base mr-2'>تومان</span>
            </span>
          </div>
          <div className='flex'>
            {...stars}
          </div>
          <p className='text-sm leading-6  font-DanaMedium' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(productDetail.description)}}>

          </p>
          <div>
            <button className='input-submit bg-blue-600' onClick={() => {
              console.log("first")
            }}>
              اضافه کردن به سبد خرید
            </button>
          </div>
        </div>
        <div className='basis-auto md:basis-1/3 mt-10'>
          <img className='w-full rounded-lg' src={`${DataUrl}/courses/covers/${productDetail.cover}`} alt="" />
        </div>
      </div>
    </>
  )
}
