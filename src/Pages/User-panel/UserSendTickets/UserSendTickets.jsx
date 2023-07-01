import React, { useEffect, useState } from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import { DataUrlV1 } from "../../../Data/Data"
import { toast } from 'react-toastify'
import { ticketalue } from '../../../Components/Input/Validate.js'
import Input from '../../../Components/Input/Input'
import Toast from '../../../Components/Toast/Toast'
import { NavLink } from 'react-router-dom'
export default function UserSendTickets() {
  const [departments, setDepartments] = useState([])
  const [departmentSub, setDepartmentSub] = useState([])
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))

  const getDepartments = () => {
    fetch(`${DataUrlV1}/tickets/departments`)
      .then(res => res.json())
      .then(data => {
        setDepartments(data)
      })
  }

  const getSubDepartments = (id) => {
    fetch(`${DataUrlV1}/tickets/departments-subs/${id}`)
      .then(res => res.json())
      .then(data => {
        setDepartmentSub(data)
      })
  }

  useEffect(() => {
    getDepartments()
  }, [])
  return (
    <>
      <div className='p-1'>
        <div className='flex justify-between items-center'>
          <span className="mb-6  text-gray-900 dark:text-white">
            ارسال تیکت
          </span>
          <NavLink to="/my-account/tickets" className="mb-6 text-white bg-green-600 hover:bg-green-700 transition-colors p-2 rounded-lg">
            همه تیکت ها
          </NavLink>
        </div>
        <Formik
          validate={ticketalue}
          initialValues={{ departmentID: "", departmentSubID: "", title: "", priority: "", body: "" }}

          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            fetch(`${DataUrlV1}/tickets/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${LocalStorageData.token}`
              },
              body: JSON.stringify(values)
            })
              .then(res => res.json())
              .then(data => {
                toast.success("تیکت با موفقیت ارسال شد.")
                setTimeout(() => {
                  resetForm()
                  setSubmitting(false)
                }, 3000);
              })


          }} >
          {({ isSubmitting, setFieldValue }) => (
            <div className='text-sm md:text-lg'>

              <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                <div>
                  <label className='input-label'>نوع دپارتمان</label>
                  <Field as="select" name="departmentID" className="input"
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      getSubDepartments(selectedValue);
                      setFieldValue("departmentID", selectedValue);
                      setFieldValue("departmentSubID", "")
                    }}
                  >
                    <option value="-1">نوع دپارتمان را انتخاب کنید</option>
                    {
                      departments.length ? (
                        departments.map(dep => (
                          <option key={dep._id} value={dep._id}>{dep.title}</option>
                        ))
                      ) : (
                        <option value="-1">دپارتمان وجود ندارد</option>
                      )
                    }
                  </Field>
                  <ErrorMessage name="departmentID">
                    {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                  </ErrorMessage>
                </div>
                <div>
                  <label className='input-label'>نوع تیکت</label>
                  <Field as="select" name="departmentSubID" className="input">
                    <option value="-1">نوع تیکت را انتخاب کنید</option>
                    {
                      departmentSub.length ? (
                        departmentSub.map(depSub => (
                          <option key={depSub._id} value={depSub._id}>{depSub.title}</option>
                        ))
                      ) : (
                        <option value="-1">دپارتمان وجود ندارد</option>
                      )
                    }
                  </Field>
                  <ErrorMessage name="departmentSubID">
                    {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                  </ErrorMessage>
                </div>
                <Input label="عنوان تیکت" type="text" name="title" placeholder="ارسال نشدن محصول" />

                <div>
                  <label className='input-label'>اولویت تیکت</label>
                  <Field as="select" name="priority" className="input">
                    <option value="-1">اولویت تیکت را انتخاب کنید</option>
                    <option value="3">عادی</option>
                    <option value="2">متوسط</option>
                    <option value="1">مهم</option>
                  </Field>
                  <ErrorMessage name="priority">
                    {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                  </ErrorMessage>
                </div>
                <div className='md:col-start-1 md:col-end-3'>
                  <label className='input-label'>محتوای تیکت</label>
                  <Field as="textarea" name="body" className="input" placeholder="..." />
                  <ErrorMessage name="body">
                    {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                  </ErrorMessage>
                </div>
                <div className='md:col-start-1 md:col-end-3'>
                  <label className="input-label">ثبت</label>
                  <button type="submit"
                    className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? ("لطفا صبر کنید ...") : ("ارسال کردن")}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik >
      </div>

      <Toast />
    </>
  )
}
