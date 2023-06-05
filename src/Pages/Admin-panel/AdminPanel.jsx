import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
export default function AdminPanel() {
  useEffect(() => {
    document.title = 'پنل مدیریت';
  })
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-x-4">
              <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <h1 className="flex">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">پنل مدیریت</span>
              </h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3 gap-x-5">
                <div>
                  <div className='relative group'>
                    <div className='py-3 '>
                      <svg className="w-7 h-7 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    </div>
                    <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 p-5  w-[400px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-2 border-gray-900 dark:border-gray-100 space-y-4 tracking-normal shadow-normal transition-all'>
                    </div>
                  </div>
                </div>
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
                    <svg className='w-7 h-7 inline-block dark:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                    <svg className='w-7 h-7 hidden dark:inline-block text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                </div>
                <div className='relative group'>
                  <img src="/images/profile.png" className='w-[30px] rounded-full' alt="" />
                  <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 p-5 w-[300px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl space-y-4 tracking-normal shadow-normal transition-all'>
                    <div className="flex flex-col gap-y-5" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        امیر دانش
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        daneshahd78@gmail.com
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        09332624415
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        <a href="#">تغییر رمز عبور</a>
                      </p>
                    </div>

                  </div>
                </div>
                <div>
                  <svg className="w-7 h-7 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </div>

              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className="fixed top-0 z-40 w-64 h-screen pt-20 transition-transform translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink to="dashboard" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700")}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">داشبورد</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="users" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">کاربران</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="products" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">محصولات</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="menus" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">منوها</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="articles" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">مقالات</span>
              </NavLink>
            </li>
          </ul>
          <div className='fixed bottom-0 font-DanaBold p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
            <NavLink to="/" target='_blank' className="p-2">
              بازدید از سایت
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:mr-64">
        <div className="p-4 dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  )
}
