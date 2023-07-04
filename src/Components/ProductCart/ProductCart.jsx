import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrl } from '../../Data/Data'
import DOMPurify from 'dompurify'
export default function ProductCart({ ...pro }) {

    return (
        <>
            <div className='md:p-5 p-2 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl'>
                <NavLink className="flex justify-center" to={`/products/${pro.shortName}`}>
                    {
                        (pro.cover) ? (
                            <img className="rounded-t-lg" src={`${DataUrl}/courses/covers/${pro.cover}`} alt="" />
                        ) : (
                            <img className="rounded-t-lg" src="/images/blogs/nocover.png" alt="" />
                        )
                    }
                </NavLink>
                <div className="md:p-4 flex flex-col justify-between items-center">

                    {
                        (pro.categoryID) ?
                            (<NavLink to={`/category/${pro.categoryID.name}`} className='my-4 text-[10px] md:text-xs  text-gray-200  rounded-2xl p-2 bg-sky-700'>{pro.categoryID.title}</NavLink>)
                            :
                            ("")
                    }

                    <h5 className="my-5 text-sm md:text-xl text-right font-DanaBold tracking-tight text-gray-900 dark:text-white">{pro.name}</h5>
                    <div className='flex text-xs md:text-xl  items-center justify-start gap-x-1 text-gray-950 dark:text-gray-200'>
                        {pro.price.toLocaleString()}
                        <span className='text-sm'>تومان</span>
                    </div>
                    <div className='mb-5 font-DanaBold  w-full flex justify-between'>
                        
                    </div>
                    <div className='flex w-full justify-between items-center text-gray-950 dark:text-gray-200'>
                        <div className="p-2 md:p-3 text-sm text-center text-white rounded-full bg-zinc-800">
                            <svg className="w-4 md:w-6 h-4 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className='flex'>
                            {
                                Array(5 - pro.courseAverageScore).fill(0).map(star => (
                                    <svg key={crypto.randomUUID()} className="w-3 md:w-5 h-3 md:h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                ))
                            }
                            {
                                Array(pro.courseAverageScore).fill(0).map(star => (
                                    <svg key={crypto.randomUUID()} className="w-3 md:w-5 h-3 md:h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                ))
                            }
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className="max-w-sm hover:shadow-xl basis-full md:basis-1/2 lg:basis-1/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10">
                <NavLink className="flex justify-center" to={`/products/${pro.shortName}`}>
                    {
                        (pro.cover) ? (
                            <img className="rounded-t-lg w-[382px] h-[382px]" src={`${DataUrl}/courses/covers/${pro.cover}`} alt="" />
                        ) : (
                            <img className="rounded-t-lg w-[382px] h-[382px]" src="/images/blogs/nocover.png" alt="" />
                        )
                    }
                </NavLink>
                <div className="p-4 flex flex-col justify-between items-center">

                    {
                        (pro.categoryID) ?
                            (<NavLink to={`/category/${pro.categoryID.name}`} className='mb-4 text-xs  text-gray-200  rounded-2xl p-2 bg-sky-700'>{pro.categoryID.title}</NavLink>)
                            :
                            ("")
                    }

                    <h5 className="mb-5 text-xl font-DanaBold tracking-tight text-gray-900 dark:text-white">{pro.name}</h5>
                    <p className="mb-5 text-gray-700 dark:text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pro.description) }}></p>
                    <div className='mb-5 font-DanaBold  w-full flex justify-between'>
                        <span className=''>
                        </span>
                        <span className='flex'>
                            {
                                Array(5 - pro.courseAverageScore).fill(0).map(star => (
                                    <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                ))
                            }
                            {
                                Array(pro.courseAverageScore).fill(0).map(star => (
                                    <svg className="w-5 h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                ))
                            }
                        </span>
                    </div>
                    <div className='flex w-full justify-between items-center text-gray-950 dark:text-gray-200'>
                        <div className='flex text-xl items-center justify-between gap-x-1'>
                            {pro.price.toLocaleString()}
                            <span className='text-sm '>تومان</span>
                        </div>
                        <div className="flex items-center px-3 py-2 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => {
                            console.log(pro._id)
                        }}>
                            اضافه کردن به سبد خرید
                            <svg aria-hidden="true" className="w-4 h-4 mr-4 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
