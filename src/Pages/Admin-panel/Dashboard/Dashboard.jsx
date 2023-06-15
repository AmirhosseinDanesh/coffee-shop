import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { DataUrlV1 } from '../../../Data/Data';
import Skeleton from 'react-loading-skeleton';
export default function Dashboard() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [infos, setInfos] = useState([])
  const { t } = useTranslation()

  const getInfos = () => {
    fetch(`${DataUrlV1}/infos/p-admin`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${LocalStorageData.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setInfos(data.infos)
        console.log(data)
      })
  }

  useEffect(() => {
    getInfos()
  }, [])

  return (
    <div className='flex justify-around flex-wrap items-center mt-5 gap-x-1 gap-y-5 text-xs md:text-base font-Dana'>
      
      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{(infos.length) ? (infos[0].title) : (<Skeleton />)}</span>
        </div>
        <div>{(infos.length) ? (infos[0].count) : (<Skeleton />)}</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/products">
              <svg className="w-3 h-3 md:w-5 md:h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{(infos.length) ? (infos[1].title) : (<Skeleton />)}</span>
        </div>
        <div>{(infos.length) ? (infos[1].count) : (<Skeleton />)}</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/users">
              <svg className="w-3 h-3 md:w-5 md:h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{(infos.length) ? (infos[2].title) : (<Skeleton />)}</span>
        </div>
        <div>{(infos.length) ? (infos[2].count) : (<Skeleton />)}</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/articles">
              <svg className="w-3 h-3 md:w-5 md:h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{(infos.length) ? (infos[3].title) : (<Skeleton />)}</span>
        </div>
        <div>{(infos.length) ? (infos[3].count) : (<Skeleton />)}</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/offs">
              <svg className="w-3 h-3 md:w-5 md:h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>




    </div>
  )
}
