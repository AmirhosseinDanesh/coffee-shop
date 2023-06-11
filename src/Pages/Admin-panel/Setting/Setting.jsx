import React from 'react'
import i18n from 'i18next'
import { Formik, Form, Field } from 'formik'
import Input from '../../../Components/Input/Input'
import { NavLink } from 'react-router-dom'
export default function Setting() {
    return (
        <>

            <Formik
                initialValues={{ lang: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    i18n.changeLanguage(values.lang)
                }
                }>
                {({ isSubmitting }) => (
                    <Form className="">
                        <div className='space-y-1 md:space-y-1 grid gap-2 mb-6 grid-cols-1 md:grid-cols-4 mt-5'>
                            <div className='flex justify-between items-end'>
                                <div>

                                    <Field as="select" name="lang" className="input">
                                        <option value="-1">زبان داشبورد را انتخاب کنید</option>
                                        <option value="fa">فارسی</option>
                                        <option value="en">انگلیسی</option>
                                    </Field>
                                    {/* <label className="input-label">موضوع مقاله</label>
                                    <select className='input' onChange={(e) => {
                                        i18n.changeLanguage(e.target.value)
                                    }} value={i18n.language} >
                                        <option value="-1">زبان داشبورد را انتخاب کنید</option>
                                        <option value="fa">فارسی</option>
                                        <option value="en">انگلیسی</option>
                                    </select> */}
                                </div>
                                <button type="submit" className="w-16 h-10 p-2.5 rounded-lg text-sm text-center font-DanaMedium text-white bg-blue-700">
                                    ثبت
                                </button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>

            {/* <div className='space-y-1 md:space-y-1 grid gap-2 mb-6 grid-cols-1 md:grid-cols-4 mt-5'>
                <div>
                    <label className="input-label">موضوع مقاله</label>
                    <select className='input' onChange={(e)=>{
                        i18n.changeLanguage(e.target.value)
                    }} value={i18n.language} >
                        <option value="-1">زبان داشبورد را انتخاب کنید</option>
                        <option value="fa">فارسی</option>
                        <option value="en">انگلیسی</option>
                    </select>
                </div>
            </div> */}
        </>
    )
}
