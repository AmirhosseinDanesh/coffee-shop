import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DataUrlV1 } from "../../Data/Data"
export default function Header() {
  const [headerLink, setHeaderLink] = useState([])
  useEffect(() => {
    fetch(`${DataUrlV1}/menus`)
      .then(res => res.json())
      .then(data => setHeaderLink(data))
  }, [])
  return (
    <header className='fixed top-9 right-0 left-0 flex items-center px-10 rounded-3xl w-[90%] h-24 mx-auto bg-black/50 backdrop-blur-[6px] z-50'>
      <div className='flex items-center w-full justify-between'>
        {/* logo & Menu */}
        <nav className='flex items-center gap-x-9 h-14'>
          {/* logo */}
          <div>
            <NavLink to="/">
              <img src="/images/app-logo.png" alt="Golden Coffee" />
            </NavLink>
          </div>
          {/* Menu */}
          <ul className='flex gap-x-9 h-full text-xl text-gray-300 tracking-tightest child:leading-[56px] child-hover:text-orange-300 transition-colors '>
            <li className={({ isActive })  => (isActive) ? ("font-DanaMedium text-orange-200") : ("font-DanaMedium") }>
              <NavLink to="/">صفحه اصلی</NavLink>
            </li>
            <li className='font-DanaMedium'>
              <ul>
                <NavLink to="/shop" className={({ isActive })  => (isActive) ? ("relative group text-orange-200") : ("relative group") }>فروشگاه</NavLink>
                <li className='relative group'>
                  <a href="/" className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full p-6 w-52 text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all child:inline-block child:transition-colors child-hover:text-orange-300'>سلام</a>
                  <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full p-6 w-52 text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all child:inline-block child:transition-colors child-hover:text-orange-300'>
                    <a href="/">قهوه خوب</a>
                    <a href="/">قهوه بد</a>
                    <a href="/">قهوه متوسط</a>
                  </div>
                </li>
                {/* {
                  headerLink.map((menu) => (
                    <li key={menu._id} className='relative group'>
                      <NavLink to={menu.href}>
                        {menu.title}
                      </NavLink>
                      {
                        menu.submenus.length !== 0 && (
                          <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full p-6 w-52 text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all child:inline-block child:transition-colors child-hover:text-orange-300'>
                            {
                              menu.submenus.map((submenu) => (
                                <NavLink key={submenu._id} to={submenu.href}>
                                  {submenu.title}
                                </NavLink>
                              ))
                            }
                          </div>
                        )
                      }
                    </li>
                  ))
                } */}
              </ul>
            </li>
            <li className='font-DanaMedium'>
              <NavLink to="/articles" className={({ isActive })  => (isActive) ? ("text-orange-200") : ("") }>مقالات</NavLink>
            </li>
            {/* {
              headerLink.map((menu) => (
                <li key={menu._id} className='relative group'>
                  <NavLink  to={menu.href}>
                    {menu.title}
                  </NavLink>
                    {
                      menu.submenus.length !== 0 && (
                        <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full p-6 w-52 text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all child:inline-block child:transition-colors child-hover:text-orange-300'>
                          {
                            menu.submenus.map((submenu)=>(
                              <NavLink key={submenu._id} to={submenu.href}>
                                {submenu.title}
                              </NavLink>
                            ))
                          }
                        </div>
                      )
                    }
                </li>
              ))
            } */}
          </ul>
        </nav>

        {/* Cart & Login */}
        <div className='flex text-orange-200 text-xl gap-x-10'>
          {/* Cart and darkmode */}
          <div className='flex items-center gap-x-5  '>
            {/* Cart */}
            <div className='relative group'>
              <div className='py-3 '>
                <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              {/*  */}
              <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 p-5  w-[400px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-t border-t-orange-300 space-y-4 tracking-normal shadow-normal transition-all'>
                <div className='flex items-center justify-between font-DanaMedium text-xs tracking-tighter'>
                  <span className='text-gray-300'>1 مورد</span>
                  <a href="#" className='flex items-center text-orange-300'>
                    مشاهده سبد خرید
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </a>

                </div>
                <div className='pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5'>
                  <div className='flex gap-x-2.5'>
                    <img src="images/products/p1.png" alt="p1" className='w-[120px] h-[120px]' />
                    <div className='flex flex-col justify-between'>
                      <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2'>قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی</h4>
                      <div>
                        <span className='text-teal-600 dark:text-emerald-500 text-xs tracking-tighter'>
                          14.500 تومان تخفیف
                        </span>
                        <div className='text-zinc-700 dark:text-white font-DanaBold'>
                          175,000
                          <span className='font-Dana text-sm mr-1'>
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-x-2.5'>
                    <img src="images/products/p1.png" alt="p1" className='w-[120px] h-[120px]' />
                    <div className='flex flex-col justify-between'>
                      <h4 className='font-DanaMedium text-zinc-700 dark:text-white text-base line-clamp-2'>قهوه اسپرسو بن مانو مدل پریسکا 250 گرمی</h4>
                      <div>
                        <span className='text-teal-600 dark:text-emerald-500 text-xs tracking-tighter'>
                          14.500 تومان تخفیف
                        </span>
                        <div className='text-zinc-700 dark:text-white font-DanaBold'>
                          175,000
                          <span className='font-Dana text-sm mr-1'>
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between mt-5'>
                  <div>
                    <span className='font-DanaMedium text-gray-300 text-xs tracking-tighter'>ملبغ قابل پرداخت</span>
                    <div className='text-zinc-700 dark:text-white font-DanaBold '>
                      175,500
                      <span className='font-Dana text-sm mr-1'>
                        تومان
                      </span>
                    </div>
                  </div>
                  <a href="#" className='flex text-lg items-center justify-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-700 transition-colors hover:bg-teal-700 rounded-xl tracking-tightest'>ثبت سفارش</a>
                </div>
              </div>
            </div>
            {/* darkmode */}
            <div>
              <div className='py-3' id='toggle-theme' onClick={() => {
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.remove('dark')
                  localStorage.theme = "light"
                } else {
                  document.documentElement.classList.add('dark')
                  localStorage.setItem("theme", "dark")
                }
              }} >
                <svg className='w-8 h-8 inline-block dark:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <svg className='w-8 h-8 hidden dark:inline-block' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
            </div>
          </div>
          <span className='block w-px h-14 bg-white/20'></span>

          {/* Login */}
          <NavLink to="/login" className='flex items-center gap-x-2.5 tracking-tightest '>
            <svg className="w-8 h-8 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span className='text-xl'>
              ورود | ثبت‌نام
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
