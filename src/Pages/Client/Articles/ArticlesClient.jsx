import React, { useEffect, useState } from 'react'
import Slider from '../../../Components/Slider/Slider'
import Article from '../../../Components/Article/Article'
import { DataUrlV1 } from "../../../Data/Data"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../../../Components/Header/Header'

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
      <Slider sliders={[{ id: 1, src: "/images/sliders/3.jpg", alt: "قهوه فوری" }]} />

      <div className='mt-10 md:p-10'>
        <div className='font-DanaBold text-3xl text-center border-b-2 pb-8 mb-10 dark:text-gray-300'>
          آخرین مقالات
        </div>
        <div className='flex flex-wrap p-4 justify-center md:justify-around gap-x-1'>
          {

            (articles.length ? (
              articles.filter(article=>article.publish == 1).map((art) => (
                <Article key={art._id} {...art} />
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
