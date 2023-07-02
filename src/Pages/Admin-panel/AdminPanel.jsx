import React, { useEffect, useContext, useState } from 'react'
import AuthContext from '../../Context/authContext'
import { Outlet, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { DataUrlV1 } from '../../Data/Data';
import swal from 'sweetalert';
import Toast from '../../Components/Toast/Toast';
import { useTranslation } from 'react-i18next';
export default function AdminPanel() {
  const [sidebar, setSidebar] = useState(false)
  const [adminData, setAdminData] = useState([])
  const [adminNotification, setAdminNotification] = useState([])
  const [isShowToast, setIsShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const { t } = useTranslation()
  const localStorageData = JSON.parse(localStorage.getItem("user"))

  const seeNotifiction = (id) => {
    fetch(`${DataUrlV1}/notifications/see/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        getNotifiction()
        setIsShowToast(true)
        setToastMessage("پیام با موفقیت خوانده شد")
        setTimeout(() => {
          setIsShowToast(false)
        }, 2000);
      })
  }

  const getNotifiction = () => {
    fetch(`${DataUrlV1}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAdminData(data)
        setAdminNotification(data.notifications)
      })
  }
  useEffect(() => {
    document.title = 'پنل مدیریت';
    getNotifiction()
  }, [])


  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-x-1">
              <button type="button" className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => {
                sidebar ? (setSidebar(false)) : (setSidebar(true))

              }}>
                <span className="sr-only">Open sidebar</span>
                {
                  sidebar ? (
                    <svg className="w-5 h-5 md:w-7 md:h-7 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 md:w-7 md:h-7 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                  )
                }
              </button>
              <h1 className="flex">
                <span className="self-center text-sm md:text-lg sm:text-2xl whitespace-nowrap dark:text-white">{t("dashboardTitle")}</span>
              </h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3 gap-x-5">
                <div>
                  <div className='relative group'>
                    <div className='py-3 '>
                      <svg className="w-5 h-6 md:w-7 md:h-7 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    </div>
                    <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full -left-24 md:left-0 p-3 w-[200px]  md:w-[350px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl border-2 border-gray-900 dark:border-gray-100 space-y-4 tracking-normal shadow-normal transition-all'>
                      <div className='flex flex-col justify-between  divide-y divide-gray-50/25'>
                        {
                          (adminNotification.length) ?
                            (
                              adminNotification.map((not) => (
                                <div key={not._id} className='py-5 flex justify-between items-center text-sm'>
                                  <span className=''>{not.msg}</span>
                                  <button onClick={() => {
                                    seeNotifiction(not._id)
                                  }}>خواندن</button>
                                </div>
                              ))
                            )
                            :
                            (
                              <div className='py-5 flex justify-between items-center text-sm'>
                                <span className=''>هیچ پیامی برای خواندن ندارید</span>
                              </div>
                            )
                        }

                      </div>
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
                    <svg className='w-5 h-6 md:w-7 md:h-7  inline-block dark:hidden' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                    <svg className='w-5 h-6 md:w-7 md:h-7  hidden dark:inline-block text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                </div>
                <div className='relative group'>
                  <svg className="w-5 h-6 md:w-7 md:h-7 dark:text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <div className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible top-full left-0 p-5 md:w-[300px] text-zinc-700 dark:text-white text-base bg-white dark:bg-zinc-700 rounded-2xl space-y-4 tracking-normal shadow-normal transition-all'>
                    <div className="flex flex-col gap-y-5" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        {adminData.name}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        {adminData.email}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        {adminData.phone}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        <a href="#">تغییر رمز عبور</a>
                      </p>
                    </div>

                  </div>
                </div>
                <div onClick={() => {
                  swal({
                    title: "آیا از اکانت خود خارج می شوید؟",
                    buttons: ["خیر", "بله"]
                  }).then((res) => {
                    if (res) {
                      auth.logout()
                      navigate("/login")
                    }
                  })

                }}>
                  <svg className="w-5 h-6 md:w-7 md:h-7  dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </div>

              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar"
        className={sidebar ? ("fixed duration-500 top-0 z-40 w-64 h-screen pt-20  transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700")
          : (
            "fixed duration-500 top-0 z-40 w-64 h-screen pt-20  translate-x-full transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700")}
        onMouseLeave={() => {
          setSidebar(false)
        }}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 text-xs md:text-base font-medium">
            <li>
              <NavLink to="dashboard" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("navDashboard")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="products" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("navProducts")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="categories" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>

                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("categories")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="articles" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("navArticles")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="users" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("navUsers")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="tickets" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>

                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("tickets")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="menus" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("navMenus")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="comments" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>

                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("comments")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="offs" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>

                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("offs")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="contacts" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                </svg>


                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("contact")}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="setting" className={({ isActive }) => (isActive ? "flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 bg-gray-700 text-white dark:bg-gray-500 " : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ")}>
                <svg className="w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <span className="flex-1 font-DanaMedium mr-2 whitespace-nowrap">{t("setting")}</span>
              </NavLink>
            </li>
          </ul>
          <div className='fixed bottom-0 font-DanaBold p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
            <NavLink to="/" target='_blank' className="p-2">
              {t("seeSite")}
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:mr-64">
        <div className="p-4 dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>

      {isShowToast && <Toast title={toastMessage} />}
    </>
  )
}
