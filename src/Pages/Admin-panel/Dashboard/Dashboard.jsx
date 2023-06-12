import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className='flex justify-around flex-wrap items-center mt-5 gap-x-1 gap-y-5 text-xs md:text-base font-Dana'>
      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{t("allSell")}</span>
        </div>
        <div>575,750,000</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-3 h-3 md:w-5 md:h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{t("profit")}</span>
        </div>
        <div>175,055,000</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-3 h-3 md:w-5 md:h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{t("orders")}</span>
        </div>
        <div>1215</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-3 h-3 md:w-5 md:h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='md:basis-1/4 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl text-center p-4'>
        <div className=''>
          <span className=''>{t("incompleteOrders")}</span>
        </div>
        <div>5</div>
        <div className='flex justify-between items-center gap-x-4'>
          <span>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-3 h-3 md:w-5 md:h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>




    </div>  
  )
}
