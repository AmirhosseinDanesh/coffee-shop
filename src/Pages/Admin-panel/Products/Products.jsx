import React from 'react'

import { NavLink } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Input from '../../../Components/Input/Input.jsx'
export default function Products() {
  return (
    <>
      <div className=''>
        <Formik
          validate={(values) => {
            const errors = {};

            if (values.name === "") {
              errors.name = "وارد کردن ایمیل الزامی است"
            }
            if (values.shortName === "") {
              errors.shortName = "وارد کردن ایمیل الزامی است"
            }
            if (values.description === "") {
              errors.description = "وارد کردن ایمیل الزامی است"
            }
            if (values.price === "") {
              errors.price = "وارد کردن ایمیل الزامی است"
            }
            if (values.status === "") {
              errors.status = "وارد کردن ایمیل الزامی است"
            }
            if (values.categoryID === "") {
              errors.categoryID = "وارد کردن دسته بندی الزامی است"
            }
            if (values.status === "") {
              errors.status = "وارد کردن وضعیت الزامی است"
            }
            if (values.cover === "") {
              errors.cover = "وارد کردن عکس الزامی است"
            }


            return errors;
          }}
          initialValues={{ name: "", shortName: "", description: "", price: "", status: "", categoryID: "", cover: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setTimeout(() => {
              setSubmitting(false)
            }, 3000);
          }} >
          {({ isSubmitting }) => (
            <div className='mt-5'>
              <span href="#" className="mb-6 text-2xl text-gray-900 dark:text-white">
                اضافه کردن محصول جدید
              </span>
              <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                <Input label="نام محصول" type="text" name="name" placeholder="محصول اول" />
                <Input label="لینک محصول" type="text" name="shortName" placeholder="product1" />
                <Input label="توضیحات محصول" type="text" name="description" placeholder="این محصول برای تمامی افراد ..." />
                <Input label="قیمت محصول" type="text" name="price" placeholder="21,000,000" />
                <div>
                  <label className="input-label">دسته بندی</label>
                  <Field as="select" name="categoryID" className="input">
                    <option value="-1">دسته بندی را انتخاب کنید</option>
                    <option value="ترک">ترک</option>
                    <option value="عربیکا">عربیکا</option>
                    <option value="اسپرسو">اسپرسو</option>
                  </Field>
                  <ErrorMessage name="categoryID">
                    {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                  </ErrorMessage>
                </div>
                <div>
                  <label className="input-label">وضعیت</label>
                  <Field as="select" name="status" className="input">
                    <option value="-1">وضعیت را انتخاب کنید</option>
                    <option value="start">start</option>
                    <option value="presell">presell</option>
                  </Field>
                  <ErrorMessage name="status">
                    {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                  </ErrorMessage>
                </div>
                <div>
                  <label className="input-label">عکس محصول</label>
                  <Field type="file" name="cover" className="input"></Field>
                  <ErrorMessage name="cover">
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
  )
}
