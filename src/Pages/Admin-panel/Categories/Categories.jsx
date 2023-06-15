import React, { useEffect, useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataUrlV1, DataUrl } from "../../../Data/Data"
import { categoryValue } from '../../../Components/Input/Validate.js'

import Input from '../../../Components/Input/Input.jsx'
import Table from '../../../Components/Table/Table.jsx'
import Modal from '../../../Components/Modal/Modal.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import swal from 'sweetalert'

export default function Categories() {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const [category, setCategory] = useState([])
    const [selectCategory, setSelectCategory] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowToast, setIsShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const closeModal = () => setIsShowModal(false)

    const getCategory = () => {
        fetch(`${DataUrlV1}/category`)
            .then(res => res.json())
            .then(data => {
                setCategory(data)
            })
    }

    const removecategory = (id) => {
        swal({
            title: "آیا از حدف این دسته بندی مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then((res) => {
            if (res) {
                fetch(`${DataUrlV1}/category/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${LocalStorageData.token}`,
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        getCategory()
                        setIsShowToast(true)
                        setToastMessage("دسته بندی با موفقیت ادد شد")
                        setTimeout(() => {
                            setIsShowToast(false)
                        }, 2000);
                    })
            }
        })
    }


    useEffect(() => {
        getCategory()
    }, [])


    return (
        <>
            {/* New Category Field */}
            <Formik
                validate={categoryValue}
                initialValues={{ name: "", title: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    fetch(`${DataUrlV1}/category/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${LocalStorageData.token}`
                        },
                        body: JSON.stringify(values)
                    })
                        .then(res => res.json())
                        .then(data => {
                            getCategory()
                            setIsShowToast(true)
                            setToastMessage("دسته بندی با موفقیت اضافه شد")
                            setTimeout(() => {
                                resetForm()
                                setSubmitting(false)
                                setIsShowToast(false)
                            }, 2000);
                        })
                }} >
                {({ isSubmitting }) => (
                    <div className='mt-5 text-sm md:text-lg'>
                        <span href="#" className="mb-6 text-gray-900 dark:text-white">
                            اضافه کردن دسته بندی جدید
                        </span>
                        <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                            <Input label="نام دسته بندی" type="text" name="title" placeholder="دسته بندی اول" />
                            <Input label="لینک دسته بندی" type="text" name="name" placeholder="Category1" />

                            <div className='col-start-1 col-end-3'>
                                <label className="input-label">ثبت</label>
                                <button type="submit"
                                    className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? ("لطفا صبر کنید ...") : ("اضافه کردن")}
                                </button>
                            </div>
                        </Form>
                    </div>
                )}

            </Formik >
            {/* Category List */}
            {
                (category.length) ? (
                    <Table
                        childrenTH={
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    نام دسته بندی
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    لینک دسته بندی
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    ویرایش دسته بندی
                                </th>

                            </tr>
                        }
                        childrenTD={
                            category.map((cat) => (
                                <tr key={cat._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cat.title}
                                    </th>
                                    <td className="px-2 py-2">
                                        {cat.name}
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className='flex'>
                                            <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                setSelectCategory(cat)
                                                setIsShowModal(true)
                                            }}>ویرایش</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                                                removecategory(cat._id)
                                            }}>حذف</button>
                                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => { console.log("edit") }}>جزئیات</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    />
                ) : (
                    <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
                        دسته بندیی موجود نیست از طریق فرم بالا میتوانید اولین دسته بندی خود را اضافه کنید.
                    </div >
                )
            }

            {/* Modal for editing category */}
            {
                isShowModal && <Modal title="ویرایش دسته بندی" onHide={closeModal}
                    children={
                        <>
                            <div className="p-6 space-y-6">
                                <Formik
                                    validate={categoryValue}
                                    initialValues={{ title: `${selectCategory.title}`, name: `${selectCategory.name}`, }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        fetch(`${DataUrlV1}/category/${selectCategory._id}`, {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": `Bearer ${LocalStorageData.token}`
                                            },
                                            body: JSON.stringify(values)
                                        })
                                            .then(res => res.json())

                                            .then(data => {
                                                getCategory()
                                                setIsShowToast(true)
                                                setToastMessage("دسته بندی با موفقیت ویرایش شد")
                                                setIsShowModal(false)
                                                setTimeout(() => {
                                                    setIsShowToast(false)
                                                    setSubmitting(false)
                                                }, 2000);
                                            })

                                    }} >
                                    {({ isSubmitting }) => (
                                        <div className='mt-5'>
                                            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                                                <Input label="نام دسته بندی" type="text" name="title" placeholder="دسته بندی اول" />
                                                <Input label="لینک دسته بندی" type="text" name="name" placeholder="Category1" />
                                                <div className='col-start-1 col-end-3'>
                                                    <label className="input-label">تغییر وضعیت</label>
                                                    <button type="submit"
                                                        className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? ("لطفا صبر کنید ...") : ("ویرایش کردن")}
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </>
                    }
                />
            }

            {
                isShowToast && <Toast title={toastMessage} />
            }

        </>
    )
}
