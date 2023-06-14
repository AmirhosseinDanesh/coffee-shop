import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import { useParams } from 'react-router-dom'
import { DataUrl, DataUrlV1 } from '../../../Data/Data'
export default function ProductDetail() {
  const [productDetail , setProductDetail] = useState([])
  const {shortName} = useParams()
  useEffect(()=>{
    fetch(`${DataUrlV1}/courses/${shortName}`)
    .then(res=>res.json())
    .then(data=>setProductDetail(data))
    console.log(productDetail)
  } , [])
  return (
    <>
      <Header />
      <div className='mt-40 flex justify-around'>
        <div className='dark:text-white'>
          <h2>{productDetail.description}</h2>
        </div>
        <div>
          <img src={`${DataUrl}/courses/covers/${productDetail.cover}`} alt="" />
        </div>
      </div>
    </>
  )
}
