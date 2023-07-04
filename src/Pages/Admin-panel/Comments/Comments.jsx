import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from "../../../Data/Data"
import { toast } from 'react-toastify';

import Table from '../../../Components/Table/Table.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import swal from 'sweetalert'
export default function Comments() {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const [comments, setComments] = useState([])

    const getComments = () => {
        fetch(`${DataUrlV1}/comments`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${LocalStorageData.token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setComments(data)
            })
    }

    const rejectComment = (id) => {
        swal({
            title: "آیا از تایید این کامنت مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                fetch(`${DataUrlV1}/comments/reject/${id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${LocalStorageData.token}`,
                    },
                }).then(res => res.json())
                    .then(data => {
                        getComments()
                        toast.info("کامنت با موفقیت رد شد")
                    })

            }
        })
    }
    const removeComment = (id) => {
        swal({
            title: "آیا از بن این کاربر مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                fetch(`${DataUrlV1}/comments/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${LocalStorageData.token}`,
                    },
                }).then(res => res.json())
                    .then(data => {
                        getComments()
                        toast.warning("کامنت با موفقیت حذف شد")
                    })

            }
        })
    }

    const showCommentbody = (body) => {
        swal({
            title: body,
        })
    }

    const banUser = (id) => {
        swal({
            title: "آیا از بن این کاربر مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                fetch(`${DataUrlV1}/users/ban/${id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${LocalStorageData.token}`,
                    },
                })
                    .then(res => {
                        if (!res.ok) {
                            toast.error("کاربر بن نشد مشکلی پیش آمده!")
                        } else {
                            res.json()
                                .then(data => {
                                    getComments()
                                    toast.warning("کاربر با موفقیت بن شد")
                                })
                        }
                    })

            }
        })
    }

    const answerComment = (id) => {
        swal({
            title: "پاسخ به کامنت کاربر",
            content: "input",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                const answer = {
                    body: res
                }
                fetch(`${DataUrlV1}/comments/answer/${id}`, {
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
                                    getComments()
                                    toast.success("پاسخ برای کامنت ثبت شد")
                                })
                        }
                    })


            }
        })
    }
    const showAnswerContent = (text) => {
        swal({
            title: text.creator.name + " : " + text.body,
            content: text.creator.name
        })
    }

    const acceptComment = (id) => {
        swal({
            title: "آیا از تایید این کامنت مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                fetch(`${DataUrlV1}/comments/accept/${id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${LocalStorageData.token}`,
                    },
                }).then(res => res.json())
                    .then(data => {
                        getComments()
                        toast.success("کامنت با موفقیت تایید شد")
                    })

            }
        })
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
            {
                (comments.length) ? (
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
                                    متن کامنت
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    امتیاز
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    محصول
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    ویرایش
                                </th>

                            </tr>
                        }
                        childrenTD={
                            comments.map((com, index) => (
                                <tr key={com._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-2 py-2">
                                        {com.creator.name}
                                    </td>
                                    <td className="px-2 py-4 line-clamp-1">
                                        {com.body}
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className='flex'>
                                            {
                                                Array(5 - com.score).fill(0).map(star => (
                                                    <svg className="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                ))
                                            }
                                            {
                                                Array(com.score).fill(0).map(star => (
                                                    <svg className="w-5 h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                ))
                                            }

                                        </div>
                                    </td>
                                    <td className="px-2 py-2">
                                        {com.course}
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className='flex'>
                                            <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                showCommentbody(com.body)
                                            }}>مشاهده</button>
                                            <button className={(com.answerContent) ? ("dark:text-white bg-green-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg") : ("dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg")} onClick={() => {
                                                answerComment(com._id)
                                            }}>پاسخ</button>
                                            {
                                                (com.answer === 1) ? (
                                                    <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                        rejectComment(com._id)
                                                    }}>رد </button>
                                                ) : (
                                                    <button className="dark:text-white bg-green-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                        acceptComment(com._id)
                                                    }}>تایید </button>
                                                )
                                            }
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => { console.log("edit") }}>ویرایش</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                removeComment(com._id)
                                            }}>حذف</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                banUser(com.creator._id)
                                            }}>بن</button>
                                            {
                                                (com.answerContent) ? (
                                                    <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium text-xs py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                        showAnswerContent(com.answerContent)
                                                    }}>مشاهده پاسخ</button>
                                                ) : (
                                                    <>

                                                    </>
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
                        کامنت موجود نیست از طریق فرم بالا میتوانید اولین کامنت خود را اضافه کنید.
                    </div >
                )
            }


            <Toast />

        </>
    )
}
