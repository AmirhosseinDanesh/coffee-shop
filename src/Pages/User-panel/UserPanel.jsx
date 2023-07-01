import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../Context/authContext'
import swal from 'sweetalert'


export default function UserPanel() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className='mt-14 md:mt-40'>
        <h3 className='text-center text-2xl md:text-4xl dark:text-white font-MorabbaMedium'>
          صفحه حساب کاربری
        </h3>
      </div>
      <div className='container mt-6 md:mt-10 text-white flex flex-col md:flex-row items-center md:items-start'>
        <div className='w-5/6 md:w-1/6 border-b md:border-b-0 md:border-l md:pl-4'>
          <ul className=''>
            <li>
              <NavLink to="dashboard" className={({ isActive }) => (isActive) ? ("userpanel-li bg-gray-900") : ("userpanel-li")}>پیشخوان</NavLink>
            </li>
            <li>
              <NavLink to="orders" className={({ isActive }) => (isActive) ? ("userpanel-li bg-gray-900") : ("userpanel-li")}>سفارشات</NavLink>
            </li>
            <li>
              <NavLink to="details" className={({ isActive }) => (isActive) ? ("userpanel-li bg-gray-900") : ("userpanel-li")}>جزئیات حساب کاربری</NavLink>
            </li>
            <li>
              <NavLink to="tickets" className={({ isActive }) => (isActive) ? ("userpanel-li bg-gray-900") : ("userpanel-li")}>تیکت های پشتیبانی</NavLink>
            </li>
            <li>
              <button className="userpanel-li w-full" onClick={() => {
                swal({
                  title: "آیا از اکانت خود خارج می شوید؟",
                  buttons: ["خیر", "بله"]
                })
                  .then(res => {
                    if (res) {
                      auth.logout()
                      navigate("/")
                    }
                  })
              }} >خروج</button>
            </li>
          </ul>
        </div>
        <div className='w-5/6 md:w-5/6'>
          <div className='pt-6 md:p-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
