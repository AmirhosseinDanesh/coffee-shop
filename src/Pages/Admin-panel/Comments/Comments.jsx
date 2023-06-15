import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from "../../../Data/Data"
import Table from '../../../Components/Table/Table.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import swal from 'sweetalert'
export default function Comments() {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const [comments, setComments] = useState([])

    const [toastMessage, setToastMessage] = useState("")
    const [isShowToast, setIsShowToast] = useState(false)
    const [isShowErrToast, setIsShowErrToast] = useState(false)

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
                        setIsShowToast(true)
                        setToastMessage("کامنت با موفقیت حذف شد")
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
                            setIsShowErrToast(true)
                            setToastMessage("کاربر بن نشد مشکلی پیش آمده!")
                        } else {
                            res.json()
                                .then(data => {
                                    getComments()
                                    setIsShowToast(true)
                                    setToastMessage("کاربر با موفقیت بن شد")
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
                            setIsShowErrToast(true)
                            setToastMessage("پاسخ مورد نظر ثبت نشد!")
                        } else {
                            res.json()
                                .then(data => {
                                    getComments()
                                    setIsShowToast(true)
                                    setToastMessage("پاسخ برای کامنت ثبت شد")
                                })
                        }
                    })


            }
        })
    }
    const showAnswerContent = (text) => {
        swal({
            title: text.creator.name + " : " + text.body,
            content :text.creator.name
        })
    }

    const acceptComment = (id) => {
        swal({
            title: "آیا از تایید این کاممنت مطمعن هستید؟",
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
                        setIsShowToast(true)
                        setToastMessage("کامنت با موفقیت حذف شد")
                    })

            }
        })
    }

    useEffect(() => {
        getComments()
        if (isShowToast || isShowErrToast) {
            setTimeout(() => {
                setIsShowToast(false);
                setIsShowErrToast(false);
            }, 2000);
        }
    }, [isShowToast, isShowErrToast])

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
                                        {com.course}
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className='flex'>
                                            <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                showCommentbody(com.body)
                                            }}>مشاهده</button>
                                            <button className={(com.answerContent) ? ("dark:text-white bg-green-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg") : ("dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg")} onClick={() => {
                                                answerComment(com._id)
                                            }}>پاسخ</button>
                                            <button className={com.answer === 1 ? ("dark:text-white bg-green-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg") : ("dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg")} onClick={() => {
                                                acceptComment(com._id)
                                            }}>تایید</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => { console.log("edit") }}>ویرایش</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                removeComment(com._id)
                                            }}>حذف</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                banUser(com.creator._id)
                                            }}>بن</button>
                                            {
                                                (com.answerContent) ? (
                                                    <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
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

            {
                isShowToast && <Toast title={toastMessage} />
            }

            {
                isShowErrToast && <ErrorToast title={toastMessage} />
            }
        </>
    )
}
