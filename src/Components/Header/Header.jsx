import React from 'react'

export default function Header() {
  return (
    <header className='fixed top-9 right-0 left-0 flex items-center px-10 rounded-3xl w-[90%] h-24 mx-auto bg-black/50 '>
      <div className='flex items-center w-full justify-between'>
        {/* logo & Menu */}
        <nav className='flex items-center gap-x-9'>
          {/* logo */}
          <div>
            <img src="/images/app-logo.png" alt="Golden Coffee" />
          </div>
          {/* Menu */}
          <ul className='flex gap-x-9 text-lg text-gray-300'>
            <li className='font-DanaMedium text-orange-200'>
              <a href="#">صفحه اصلی</a>
            </li>
            <li>
              <a href="#">فروشگاه</a>
              {/* sub menu */}
              <ul className='hidden'>
                <li>
                  <a href="#">قهوه ویژه</a>
                </li>
                <li>
                  <a href="#">قهوه درجه یک</a>
                </li>
                <li>
                  <a href="#">ترکیبات ویژه</a>
                </li>
                <li>
                  <a href="#">کپسول قهوه</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">دیکشنری</a>
            </li>
            <li>
              <a href="#">بلاگ</a>
            </li>
            <li>
              <a href="#">درباره ما</a>
            </li>
            <li>
              <a href="#">تماس با ما</a>
            </li>
          </ul>
        </nav>

        {/* Cart & Login */}
        <div className='flex text-orange-200 text-xl gap-x-10'>
          {/* Cart and darkmode */}
          <div className='flex gap-x-5 items-center'>
            {/* Cart */}
            <div>
              <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            {/* darkmode */}
            <span>
              <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </span>
          </div>

          <span className='block w-px h-14 bg-white/20'></span>
          
          {/* Login */}
          <a href="#" className='flex gap-x-2.5 items-center'>
            <svg className="w-8 h-8 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>
              ورود | ثبت‌نام
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
