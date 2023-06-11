import React from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrl } from '../../Data/Data'

export default function Article({ ...art }) {
    return (
        <>
            <div className="max-w-sm basis-full md:basis-1/2 lg:basis-1/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10">
                <NavLink to={art.shortName}>
                    {
                        (art.cover) ? (
                            <img className="rounded-t-lg w-[382px] h-[382px]" src={`${DataUrl}/courses/covers/${art.cover}`} alt=""/>
                        ) : (
                            <img className="rounded-t-lg w-[382px] h-[382px]" src="/images/blogs/nocover.png" alt=""/>
                        )
                    }
                </NavLink>
                <div className="p-5 flex flex-col justify-between items-center">
                    <NavLink to={art.shortName}>
                        <h5 className="mb-2 text-xl font-DanaBold tracking-tight text-gray-900 dark:text-white">{art.title}</h5>
                    </NavLink>
                    <p className="mb-3 text-gray-700 dark:text-gray-400 line-clamp-2">{art.body}</p>
                    <NavLink to={art.shortName} className="flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        ادامه مطلب
                        <svg aria-hidden="true" className="w-4 h-4 mr-4 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </NavLink>
                </div>
            </div>
        </>
    )
}
