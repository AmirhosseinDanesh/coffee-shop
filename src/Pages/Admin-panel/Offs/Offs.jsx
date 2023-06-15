import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from "../../../Data/Data"
import Input from '../../../Components/Input/Input.jsx'
import Table from '../../../Components/Table/Table.jsx'
import Modal from '../../../Components/Modal/Modal.jsx'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { offsValue } from '../../../Components/Input/Validate.js'

import Toast from "../../../Components/Toast/Toast.jsx"



export default function Offs() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [courses, setCourses] = useState([])
  const [offs, setOffs] = useState({})
  const [isShowToast, setIsShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [selectOff, setSelectOff] = useState({})
  const [isShowModal, setIsShowModal] = useState(false)
  const closeModal = () => setIsShowModal(false)


  const getOffs = () => {
    fetch(`${DataUrlV1}/offs`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${LocalStorageData.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOffs(data))
  }
  const getCourses = () => {
    fetch(`${DataUrlV1}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
  }
  const removeOffs = (id) => {
    swal({
      title: "آیا از حدف این محصول مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      if (res) {
        fetch(`${DataUrlV1}/offs/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            getOffs()
            setIsShowToast(true)
            setToastMessage("محصول با موفقیت حدف شد")
            setTimeout(() => {
              setIsShowToast(false)
            }, 2000);
          })
      }
    })
  }
  useEffect(() => {
    getCourses()
    getOffs()
  }, [])

  return (
    <>
      <Formik
        validate={offsValue}
        initialValues={{ code: "", percent: "", course: "", max: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.confirmPassword = values.password
          fetch(`${DataUrlV1}/offs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${LocalStorageData.token}`,

            },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(data => {
              getOffs()
              setIsShowToast(true)
              setToastMessage("کد تخفیف با موفقیت اضافه شد")
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
              اضافه کردن کد تخفیف جدید
            </span>
            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
              <Input label="نام کد تخفیف" type="text" name="code" placeholder="arabika20" />
              <Input label="درصد کد تخفیف" type="text" name="percent" placeholder="20" />
              <Input label="حداکثر استفاده" type="text" name="max" placeholder="1" />
              <div>
                <label className="input-label">کد تخفیف</label>
                <Field as="select" name="course" className="input">
                  <option value="-1"> کد تخفیف را انتخاب کنید</option>
                  {
                    // console.log(courses)
                    courses.map((course) => (
                      <option key={course._id} value={course._id}>{course.name}</option>
                    ))
                  }
                </Field>
                <ErrorMessage name="course">
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
      {
        (offs.length) ? (
          <Table
            childrenTH={
              <tr>
                <th scope="col" className="px-2 py-3">
                  نام کد تخفیف
                </th>
                <th scope="col" className="px-2 py-3">
                  درصد کد تخفیف
                </th>
                <th scope="col" className="px-2 py-3">
                  حداکثر استفاده
                </th>
                <th scope="col" className="px-2 py-3">
                  تعداد استفاده
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
              offs.map((off) => (
                <tr key={off._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {off.code}
                  </th>
                  <td className="px-2 py-2">
                    {off.percent}
                  </td>
                  <th scope="row" className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {off.max}
                  </th>
                  <th scope="row" className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {off.uses}
                  </th>
                  <td className="px-2 py-2">
                    {
                      courses.filter((cou) => {
                        return cou._id === off.course
                      }).map(co => (
                        co.name
                      ))
                    }
                  </td>
                  <td className="px-2 py-2">
                    <div className='flex'>
                      <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        setSelectOff(off)
                        setIsShowModal(true)
                        // setSelectoffcover(off.cover)
                      }}>ویرایش</button>
                      <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        removeOffs(off._id)
                      }}>حذف</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          />
        ) : (
          <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
            کد تخفیفی موجود نیست از طریق فرم بالا میتوانید اولین کد تخفیف خود را اضافه کنید.
          </div >
        )
      }
      {
        isShowModal && <Modal title="ویرایش محصول" onHide={closeModal}
          children={
            <>
              <div className="p-6 space-y-6">
                <Formik
                  validate={offsValue}
                  initialValues={{ code: selectOff.code, percent: selectOff.percent, course: selectOff.course, max: selectOff.max }}
                  onSubmit={(values, { setSubmitting }) => {

                    fetch(`${DataUrlV1}/offs/${selectOff._id}`, {
                      method: "PUT",
                      headers: {
                        'Authorization': `Bearer ${LocalStorageData.token}`
                      },
                      body: JSON.stringify(values)
                    })
                      .then(res => console.log(res))
                      // .then(data=>console.log(data))
                      // .then(data => {
                      //   getOffs()
                      //   setIsShowToast(true)
                      //   setToastMessage("محصول با موفقیت ویرایش شد")
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
                        <Input label="نام کد تخفیف" type="text" name="code" placeholder="arabika20" />
                        <Input label="درصد کد تخفیف" type="text" name="percent" placeholder="20" />
                        <Input label="حداکثر استفاده" type="text" name="max" placeholder="1" />
                        <div>
                          <label className="input-label">کد تخفیف</label>
                          <Field as="select" name="course" className="input">
                            <option value="-1"> کد تخفیف را انتخاب کنید</option>
                            {
                              // console.log(courses)
                              courses.map((course) => (
                                <option key={course._id} value={course._id}>{course.name}</option>
                              ))
                            }
                          </Field>
                          <ErrorMessage name="course">
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
