import React, { useEffect, useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataUrlV1, DataUrl } from "../../../Data/Data"
// import { MenusValue } from '../../../Components/Input/Validate.js'

import Input from '../../../Components/Input/Input.jsx'
import Table from '../../../Components/Table/Table.jsx'
import Modal from '../../../Components/Modal/Modal.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import swal from 'sweetalert'

export default function Menus() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [menus, setMenus] = useState([])
  const [selectMenus, setSelectMenus] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowToast, setIsShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const closeModal = () => setIsShowModal(false)

  const getMenus = () => {
    fetch(`${DataUrlV1}/menus/all`)
      .then(res => res.json())
      .then(data => {
        setMenus(data)
      })
  }

  const removeMenus = (id) => {
    swal({
      title: "آیا از حدف این منو مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      if (res) {
        fetch(`${DataUrlV1}/menus/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            getMenus()
            setIsShowToast(true)
            setToastMessage("منو با موفقیت ادد شد")
            setTimeout(() => {
              setIsShowToast(false)
            }, 2000);
          })
      }
    })
  }


  useEffect(() => {
    getMenus()
  }, [])


  return (
    <>
      {/* New Menus Field */}
      <Formik
        // validate={MenusValue}
        initialValues={{ href: "", title: "", parent: undefined }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values)
          fetch(`${DataUrlV1}/menus/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${LocalStorageData.token}`
            },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(data => {
              getMenus()
              setIsShowToast(true)
              setToastMessage("منو با موفقیت اضافه شد")
              setTimeout(() => {
                resetForm()
                setSubmitting(false)
                setIsShowToast(false)
              }, 2000);
            })
        }} >
        {({ isSubmitting }) => (
          <div className='mt-5 text-sm md:text-lg'>
            <span href="#" className="mb-6  text-gray-900 dark:text-white">
              اضافه کردن منو جدید
            </span>
            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
              <Input label="نام منو" type="text" name="title" placeholder="عربیکا" />
              <Input label="لینک منو" type="text" name="href" placeholder="arabika" />
              <div>
                <label className='input-label'>دسته بندی منوها</label>
                <Field as="select" name="parent" className="input">
                  <option value="-1">دسته بندی را انتخاب کنید</option>
                  {
                    (menus.length) ? (
                      menus.map((menu) => (
                        !Boolean(menu.parent) && (
                          <option key={menu._id} value={menu._id}>{menu.title}</option>
                        )
                      ))
                    ) : (
                      <option value="-1">دسته بندی وجود ندارد</option>
                    )

                  }
                </Field>
                <ErrorMessage name="categoryID">
                  {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                </ErrorMessage>
              </div>

              <div className=''>
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
      {/* Menus List */}
      {
        (menus.length) ? (
          <Table
            childrenTH={
              <tr>
                <th scope="col" className="px-2 py-3">
                  نام منو
                </th>
                <th scope="col" className="px-2 py-3">
                  لینک منو
                </th>
                <th scope="col" className="px-2 py-3">
                  Parent
                </th>
                <th scope="col" className="px-2 py-3">
                  ویرایش منو
                </th>

              </tr>
            }
            childrenTD={
              menus.map((cat) => (
                <tr key={cat._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {cat.title}
                  </th>
                  <td className="px-2 py-2">
                    {cat.href}
                  </td>
                  <td className="px-2 py-2">
                    {(cat.parent) ? (cat.parent.title) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                    </svg>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    <div className='flex'>
                      <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        setSelectMenus(cat)
                        setIsShowModal(true)
                      }}>ویرایش</button>
                      <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        removeMenus(cat._id)
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
            منوی موجود نیست از طریق فرم بالا میتوانید اولین منو خود را اضافه کنید.
          </div >
        )
      }

      {/* Modal for editing Menus */}
      {
        isShowModal && <Modal title="ویرایش منو" onHide={closeModal}
          children={
            <>
              <div className="p-6 space-y-6">
                <Formik
                  // validate={MenusValue}
                  initialValues={{ title: `${selectMenus.title}`, href: `${selectMenus.href}`, }}
                  onSubmit={(values, { setSubmitting }) => {
                    fetch(`${DataUrlV1}/Menus/${selectMenus._id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${LocalStorageData.token}`
                      },
                      body: JSON.stringify(values)
                    })
                      .then(res => {
                        console.log(res)
                        // res.json()
                      })

                    // .then(data => {
                    //   getMenus()
                    //   setIsShowToast(true)
                    //   setToastMessage("منو با موفقیت ویرایش شد")
                    //   setIsShowModal(false)
                    //   setTimeout(() => {
                    //     setIsShowToast(false)
                    //     setSubmitting(false)
                    //   }, 2000);
                    // })

                  }} >
                  {({ isSubmitting }) => (
                    <div className='mt-5'>
                      <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                        <Input label="نام منو" type="text" name="title" placeholder="منو اول" />
                        <Input label="لینک منو" type="text" name="href" placeholder="Menus1" />
                        <div className=''>
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
