import React from 'react'
import Header from '../../../Components/Header/Header'
import Slider from '../../../Components/Slider/Slider'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactUsValue } from "../../../Components/Input/Validate"
import Input from '../../../Components/Input/Input'
import { DataUrlV1 } from '../../../Data/Data'
import swal from 'sweetalert'
export default function Contact() {
    return (
        <>
            <Header />
            <div className='flex justify-center items-center mt-52'>
                <img src="images/contact.png" alt="" />
            </div>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-sm">
                <h2 className="mb-4 text-3xl tracking-tight font-DanaBold text-center text-gray-900 dark:text-white">تماس با ما</h2>
                <p className="mb-8 lg:mb-16 font-DanaMedium text-center text-gray-500 dark:text-gray-400 sm:text-xl">برای مشکلات فنی یا همکاری یا ... میتوانید از طریق فرم زیر با ما در ارتباط باشید.</p>
                <Formik
                    validate={contactUsValue}
                    initialValues={{ name: "", email: "", phone: "", body: "" }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        fetch(`${DataUrlV1}/contact`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values)
                        })
                            .then(res =>res.json())
                            .then(data => {
                                swal({
                                    title:"پیام شما با موفقیت ارسال شد"
                                })
                                setSubmitting(false)
                                resetForm("")
                            })

                    }} >
                    {({ isSubmitting }) => (
                        <div className='mt-5 text-sm md:text-lg'>
                            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-1 mt-5">
                                <Input label="نام و نام خانوادگی " type="text" name="name" placeholder="امیر دانش" />
                                <Input label="ایمیل" type="text" name="email" placeholder="daneshadh78@gmail.com" />
                                <Input label="شماره تلفن" type="text" name="phone" placeholder="09332624415" />
                                <div>
                                    <label className="input-label">متن پیام</label>
                                    <Field as="textarea" name="body" className="input" placeholder="درخواست همکاری ..." required="" />
                                    <ErrorMessage name="body">
                                        {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                                    </ErrorMessage>
                                </div>

                                <div className=''>
                                    <label className="input-label">ثبت</label>
                                    <button type="submit"
                                        className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? ("لطفا صبر کنید ...") : ("ثبت درخواست")}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    )}

                </Formik >
            </div>
        </>
    )
}
