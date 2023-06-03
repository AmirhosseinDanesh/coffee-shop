import React, { useEffect, useState } from 'react'
import Slider from '../../../Components/Slider/Slider'
import Article from '../../../Components/Article/Article'
import { DataUrlV1 } from "../../../Data/Data"
export default function ArticlesClient() {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch(`${DataUrlV1}/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [])
  return (
    <>
      <Slider sliders={[{ id: 1, src: "/images/sliders/3.jpg", alt: "قهوه فوری" }]} />

      <div className='mt-20 p-10'>
        <div className='font-DanaBold text-3xl text-center border-t-2 pt-5'>
          آخرین مقالات
        </div>
        <div className='flex flex-row p-4'>
          {
            articles.map((art) => (
              <Article {...art} />
            ))
          }

        </div>
      </div>
    </>
  )
}
