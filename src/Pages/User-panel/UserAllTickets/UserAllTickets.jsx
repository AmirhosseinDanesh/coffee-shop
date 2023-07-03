import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { DataUrlV1 } from "../../../Data/Data"
import Pagination from '../../../Components/Pagination/Pagination.jsx'
import Table from '../../../Components/Table/Table'

export default function UserAllTickets() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [tickets, setTickets] = useState([])
  const [currentItems, setCurrentItems] = useState([])

  const getTickets = () => {
    fetch(`${DataUrlV1}/tickets/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${LocalStorageData.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setTickets(data)
      })
  }

  useEffect(() => {
    getTickets()
  }, [])
  return (
    <div className='p-1'>
      <div className='flex justify-between items-center'>
        <span className="mb-6  text-gray-900 dark:text-white">
          همه تیکت ها
        </span>
        <NavLink to="/my-account/tickets/send-tickets" className="mb-6 text-white bg-green-600 hover:bg-green-700 transition-colors p-2 rounded-lg">
          ارسال تیکت
        </NavLink>
      </div>
      {
        tickets.length ? (
          tickets.map(tick => (
            <div key={tick._id} className='border rounded-xl mb-6'>
              <NavLink to={`answer/${tick._id}`} >
                <div className='h-28 flex justify-around items-center text-xs md:text-base text-center '>
                  <p className='w-1/4  md:w-full md:line-clamp-none line-clamp-1'>{tick.title}</p>
                  <p className='w-1/4  md:w-full md:line-clamp-none line-clamp-1'>{tick.user}</p>
                  <p className='w-1/4  md:w-full md:line-clamp-none hidden'>{tick.createdAt.slice(0, 10)}</p>
                  <p className='w-1/12 md:w-full md:line-clamp-none  '>
                    {
                      tick.answer == 0 ? (
                        <>
                          <svg className="w-5 h-5 text-red-500 block md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className='hidden md:block'>پاسخ داده نشده</span>
                        </>

                      ) : (
                        <>
                          <svg className="w-5 h-5 text-green-500 block md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className='hidden md:block'>پاسخ داده شده</span>

                        </>

                      )
                    }
                  </p>
                  <p className='w-1/4  md:w-full md:line-clamp-none line-clamp-1'>{tick.departmentSubID}</p>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <div>
            هیچ تیکتی وجود ندارد.
          </div>
        )
      }
    </div>
  )
}



