import React from 'react'
import PanelNav from "../../../Components/PanelNav/PanelNav.jsx"

import { NavLink } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Input from '../../../Components/Input/Input.jsx'
// import { emailValidate } from "../../../Components/Input/Validate.js"
export default function Login() {
    return (
        <>
            <PanelNav />

            <section className="bg-gray-200 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl text-gray-900 dark:text-white">
                        پنل مدیریتی
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white texc">
                                ورود به اکانت
                            </h1>

                            <Formik
                                validate={(values) => {
                                    const errors = {};
                                    
                                    if (values.email === "") {
                                        errors.email = "وارد کردن ایمیل الزامی است"
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = "ایمیل وارد شده اشتباه است"
                                    }

                                    if (values.password === "") {
                                        errors.password = "وارد کردن رمزعبور الزامی است"
                                    } else if (values.password.length < 4) {
                                        errors.password = "کاراکتر های رمزعبور کم است"
                                    }

                                    return errors;
                                }}
                                initialValues={{ email: "", password: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values)
                                    setTimeout(() => {
                                        setSubmitting(false)
                                    }, 3000);
                                }} >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        <Input label="ایمیل" type="email" name="email" placeholder="name@company.com" />
                                        <Input label="رمز عبور" type="password" name="password" placeholder="••••••••" />

                                        <div className="flex items-center justify-between">
                                            <a href="#" className="text-sm text-primary-600 hover:underline dark:text-primary-500 dark:text-white ">فراموشی رمز عبور</a>
                                        </div>
                                        <button type="submit"
                                            className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? ("لطفا صبر کنید ...") : ("ورود")}
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            <NavLink to="/register" className=" text-gray-500 dark:text-gray-400 p-2 rounded-lg font-DanaMedium">ثبت نام</NavLink>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
