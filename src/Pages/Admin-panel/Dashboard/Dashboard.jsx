import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function Dashboard() {


  return (
    <div className='flex justify-around items-center mt-5'>
      {/* <div className='p-5 w-44 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl'>
        <div className='flex items-center justify-center '>
          <span className='text-lg'>محصولات</span>
        </div>
        <div className='flex justify-center text-2xl'>120</div>
        <div className='flex  justify-between items-center'>
          <span className='text-sm'>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-5 h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='p-5 w-44 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl'>
        <div className='flex items-center justify-center '>
          <span className='text-lg'>مقاله ها</span>
        </div>
        <div className='flex justify-center text-2xl'>10</div>
        <div className='flex  justify-between items-center'>
          <span className='text-sm'>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-5 h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div> */}

      <div className='p-5 w-44 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl'>
        <div className='flex items-center justify-center '>
          <span className='text-lg'>کل فروش</span>
        </div>
        <div className='flex justify-center text-2xl'>575,750,000</div>
        <div className='flex  justify-between items-center'>
          <span className='text-sm'>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-5 h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='p-5 w-44 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl'>
        <div className='flex items-center justify-center '>
          <span className='text-lg'>سود فروش</span>
        </div>
        <div className='flex justify-center text-2xl'>175,055,000</div>
        <div className='flex  justify-between items-center'>
          <span className='text-sm'>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-5 h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='p-5 w-44 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl'>
        <div className='flex items-center justify-center '>
          <span className='text-lg'>سفارشات</span>
        </div>
        <div className='flex justify-center text-2xl'>1215</div>
        <div className='flex  justify-between items-center'>
          <span className='text-sm'>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-5 h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>

      <div className='p-5 w-44 bg-[#24314d] text-white flex flex-col gap-y-6 rounded-2xl'>
        <div className='flex items-center justify-center '>
          <span className='text-lg'>سفارشات نا تمام</span>
        </div>
        <div className='flex justify-center text-2xl'>5</div>
        <div className='flex  justify-between items-center'>
          <span className='text-sm'>مشاهده همه</span>
          <div className='border rounded-full p-1 hover:border-gray-500 hover:text-gray-500 transition-colors'>
            <NavLink to="/p-admin/orders">
              <svg className="w-5 h-5  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </NavLink>
          </div>

        </div>
      </div>




    </div>
  )
}
