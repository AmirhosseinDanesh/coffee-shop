import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from "../../../Data/Data"
import { toast } from 'react-toastify';

import Table from '../../../Components/Table/Table';
import Toast from '../../../Components/Toast/Toast';
import swal from 'sweetalert'
export default function Tickets() {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const [tickets, setTickets] = useState([])

    const getTickets = () => {
        fetch(`${DataUrlV1}/tickets`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${LocalStorageData.token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setTickets(data)
                console.log(data)
            })
    }

    const showTicketBody = (text) => {
        swal({
            title: text,
            buttons: "اوکی"
        })
    }

    const answerTicket = (id) => {
        swal({
            title: "پاسخ به کامنت کاربر",
            content: "input",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                const answer = {
                    body: res,
                    ticketID: id
                }
                fetch(`${DataUrlV1}/tickets/answer/`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${LocalStorageData.token}`,
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(answer)
                })
                    .then(res => {
                        if (!res.ok) {
                            toast.error("پاسخ مورد نظر ثبت نشد!")
                        } else {
                            res.json()
                                .then(data => {
                                    getTickets()
                                    toast.success("پاسخ برای تیکت ثبت شد")
                                })
                        }
                    })


            }
        })
    }

    useEffect(() => {
        getTickets()
    }, [])

    return (
        <>
            {
                (tickets.length) ? (
                    <Table
                        childrenTH={
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    شناسه
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    کاربر
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    عنوان
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    دپارتمان
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    اولویت
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    ویرایش
                                </th>

                            </tr>
                        }
                        childrenTD={
                            tickets.map((ticket, index) => (
                                <tr key={ticket._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-2 py-2">
                                        {ticket.user}
                                    </td>
                                    <td className="px-2 py-4">
                                        {ticket.title}
                                    </td>
                                    <td className="px-2 py-4">
                                        {ticket.departmentSubID}
                                    </td>
                                    <td className="px-2 py-2">
                                        {ticket.priority === 1 && "مهم"}
                                        {ticket.priority === 2 && "عادی"}
                                        {ticket.priority === 3 && "متوسط"}
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className='flex'>
                                            <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                showTicketBody(ticket.body)
                                            }}>مشاهده</button>
                                            {
                                                ticket.answer === 0 ? (
                                                    <button className="dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                        answerTicket(ticket._id)
                                                    }}>پاسخ</button>
                                                ) : (
                                                    <button className="dark:text-white bg-green-700 hover:bg-green-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg">پاسخ داده شده</button>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    />
                ) : (
                    <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
                       تیکتی موجود نیست.
                    </div >
                )
            }


            <Toast />

        </>
    )
}
