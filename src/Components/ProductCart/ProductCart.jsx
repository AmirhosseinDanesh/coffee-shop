import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrl } from '../../Data/Data'

export default function ProductCart({ ...pro }) {
    console.log(pro)
    const stars = [];
    for (let i = 0; i < pro.courseAverageScore; i++) {
        stars.push(
            <svg key={i} className="w-4 h-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
        );
    }

    return (
        <>
            <div className="max-w-sm hover:shadow-xl basis-full md:basis-1/2 lg:basis-1/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10">
                <NavLink className="flex justify-center" to={`/courses/${pro.shortName}`}>
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
                            (console.log("False"))
                    }

                    <h5 className="mb-5 text-xl font-DanaBold tracking-tight text-gray-900 dark:text-white">{pro.name}</h5>
                    <p className="mb-5 text-gray-700 dark:text-gray-400 line-clamp-2">{pro.description}</p>
                    <div className='mb-5 font-DanaBold  w-full flex justify-between'>
                        <span className=''>

                        </span>
                        <span className='flex'>
                            {stars}
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
            </div>
        </>
    )
}