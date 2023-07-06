import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrl } from '../../Data/Data'
import moment from "moment-jalaali";
import fa from "moment/src/locale/fa";


export default function ArticleCart({ ...art }) {
    moment.locale("fa", fa);
    moment.loadPersian({ dialect: 'persian-modern' });
    
    return (
        <>
            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-700 dark:border-gray-700 flex md:flex-col items-center p-2">
                <div className="w-1/3 md:w-full">
                    <NavLink to={art.shortName}>
                        {
                            (art.cover) ? (
                                <img className="rounded-2xl rounded-bl-[32px] h-[129px] md:h-full" src={`${DataUrl}/courses/covers/${art.cover}`} alt="" />
                            ) : (
                                <img className="rounded-2xl rounded-bl-[32px] h-[129px] md:h-full" src="/images/blogs/nocover.png" alt="" />
                            )
                        }
                    </NavLink>
                </div>
                <div className="p-2 flex flex-col md:flex-row justify-between items-center w-2/3 md:w-full md:mt-4">
                    <h5 className="pb-2  border-b md:border-l md:border-b-0 border-white/10 md:w-3/4 md:pl-2">
                        <p className="mb-2 text-sm md:text-base font-Dana tracking-tight text-gray-900 dark:text-white leading-7 line-clamp-2">{art.title}</p>
                    </h5>
                    <div className='flex justify-between items-center w-full md:w-1/4 mt-4 md:mt-0 md:pr-2 '>
                        <span className='text-xs text-emerald-500 md:text-sm text-center md:w-1/2 md:mx-auto md:leading-6 flex md:flex-col gap-x-1'>
                            <span className='md:text-2xl font-DanaBold'>
                                {moment(art.createdAt).locale('fa').format('jD')}
                            </span>
                            <span className=''>
                                {moment(art.createdAt).locale('fa').format('jMMMM')}
                            </span>
                            <span className=''>
                                {moment(art.createdAt).locale('fa').format('jYYYY')}
                            </span>
                        </span>
                        <NavLink to={art.shortName} className='md:hidden text-xs text-orange-300 bg-orange-200/20 rounded-md p-1 px-2 flex items-center '>
                            <span>
                                مطالعه
                            </span>
                            <svg className="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
