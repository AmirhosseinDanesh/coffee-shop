import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { DataUrlV1 } from '../../../Data/Data'
export default function UserSingleTickets() {
    const { id } = useParams()
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const [ticketInfo, setTicketInfo] = useState([])
    useEffect(() => {
        fetch(`${DataUrlV1}/tickets/answer/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${LocalStorageData.token}`,
            },
        })
            .then(res => res.json())
            .then(data => { setTicketInfo(data) })

    }, [])
    return (
        <div className='p-1'>
            <div className='flex justify-between items-center'>
                <span className="mb-6  text-gray-900 dark:text-white">
                    جواب تیکت
                </span>
                <NavLink to="/my-account/tickets" className="mb-6 text-white bg-green-600 hover:bg-green-700 transition-colors p-2 rounded-lg">
                    همه تیکت ها
                </NavLink>
            </div>

            <div className='relative'>
                <div className='bg-blue-700 rounded-l-2xl rounded-t-2xl w-3/4 mb-10'>
                    <p className='p-5'>{ticketInfo.ticket}</p>
                </div>

                {ticketInfo.answer ? (
                    <div className='bg-green-700 rounded-r-2xl rounded-t-2xl absolute right-1/4'>
                        <p className='p-5'>{ticketInfo.answer}</p>
                    </div>
                ) : (
                    <p className='text-center bg-blue-500 p-2 rounded-xl'>هنوز پاسخی برای این تیکت ثبت نشده است.</p>
                )}
            </div>
        </div>
    )
}
