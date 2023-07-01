import React,{useEffect} from 'react'

import { useContext } from 'react'
import AuthContext from '../../../Context/authContext'

export default function UserDashboard() {
  const auth = useContext(AuthContext)
  useEffect(() => {

  }, [])

  return (
    <div>
      <div className='p-1'>
        <div>
          <h3 className='flex items-center text-gray-300'>
            سلام
            <span className='font-DanaBold mx-1 text-white'>{auth ? (auth.userInfos.name) : ("کاربر")}</span>
            خوش آمدید.
            <svg className="w-5 h-5 fill-current text-red-500" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>

          </h3>
        </div>
        <div className='mt-5'>
          <p className='text-sm text-gray-300'>با استفاده از حساب کاربری خود میتوانید سفارش های اخیر خود را مدیریت کنید و از آخرین جزئیات سفارش خود مطلع شوید.</p>
        </div>

      </div>
    </div>
  )
}
