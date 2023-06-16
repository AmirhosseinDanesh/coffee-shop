import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from "../../../Data/Data"
import { toast } from 'react-toastify';
import Table from '../../../Components/Table/Table.jsx'
import swal from 'sweetalert'
import Toast from "../../../Components/Toast/Toast.jsx"
export default function Contacts() {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const [contacts, setContacts] = useState([])

    const getContacts = () => {
        fetch(`${DataUrlV1}/contact`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${LocalStorageData.token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setContacts(data)
            })
    }

    const removeContact = (id) => {
        swal({
            title: "آیا از حدف این پیام مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        })
            .then(res => {
                if (res) {
                    fetch(`${DataUrlV1}/contact/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${LocalStorageData.token}`,
                        },
                    })
                        .then(res => res.json())
                        .then(data => {
                            getContacts()
                            toast.warning("پیام با موفقیت حذف شد.")
                        })
                }
            })
    }

    const answerContact = (email) => {
        swal({
            title: "پاسخ خود را وارد کنید",
            content: "input",
            buttons: ["بستن", "ارسال"]
        })
            .then(res => {
                if (res) {
                    const answer = {

                        email,
                        answer: res
                    }
                    fetch(`${DataUrlV1}/contact/answer/`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${LocalStorageData.token}`,
                            "Content-Type": "application/json"
                        }, body: JSON.stringify(answer)
                    })
                        .then(res => {
                            if (!res.ok) {

                                toast.error("پاسخ مورد نظر ارسال نشد!")
                            } else {
                                res.json()
                                    .then(data => {
                                        getContacts()
                                        toast.success("پاسخ برای پیام موردنظر ارسال شد")
                                    })
                            }
                        })

                }
            })
    }
    useEffect(() => {
        getContacts()
    }, [])

    return (
        <>
            {
                (contacts.length) ? (
                    <Table
                        childrenTH={
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    شناسه
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    نام
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    خلاصه پیام
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    ایمیل
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    تلفن
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    ویرایش
                                </th>
                            </tr>
                        }
                        childrenTD={
                            contacts.map((contact, index) => (
                                <tr key={contact._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {contact.name}
                                    </th>
                                    <td className="px-2 py-4 line-clamp-1">
                                        {contact.body}
                                    </td>
                                    <td className="px-2 py-2">
                                        {contact.email}
                                    </td>
                                    <td className="px-2 py-2">
                                        {contact.phone}
                                    </td>
                                    <td className="px-2 py-2 flex">

                                        <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                            swal({
                                                title: contact.body
                                            })
                                        }}>مشاهده</button>
                                        <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                            removeContact(contact._id)
                                        }}>حذف</button>
                                        <button className=" dark:text-white bg-green-700 hover:bg-green-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                            answerContact(contact.email)
                                        }}>پاسخ</button>


                                    </td>
                                </tr>
                            ))
                        }
                    />
                ) : (
                    <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
                        پیامی موجود نیست.
                    </div >
                )
            }

            <Toast />
        </>
    )
}
