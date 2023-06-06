import React from 'react'
import { NavLink } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import PanelNav from '../../../Components/PanelNav/PanelNav'
import Input from '../../../Components/Input/Input.jsx'
import { registerValidate } from '../../../Components/Input/Validate'

import {DataUrlV1} from "../../../Data/Data"
export default function Register() {
    return (
        <>
            <PanelNav />
            <section className="bg-gray-200 dark:bg-gray-900 mt-20">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        پنل مدیریتی
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                ثبت نام
                            </h1>
                            <Formik
                                validate={registerValidate}
                                initialValues={{ name: "", username: "", phone: "", email: "", password: ""  }}
                                onSubmit={(values, { setSubmitting }) => {
                                    const newUserInfo = {
                                        name : values.name ,
                                        username : values.username ,
                                        phone : values.phone ,
                                        email : values.email ,
                                        password : values.password ,
                                        confirmPassword : values.password ,
                                    }
                                    fetch(`${DataUrlV1}/auth/register` , {
                                        method: "POST" ,
                                        headers : {
                                            "Content-Type" : "application/json"
                                        },
                                        body : JSON.stringify(newUserInfo)
                                    }).then(res=>res.json())
                                        .then(data => console.log(data.accessToken))
                                    
                                    setTimeout(() => {
                                        setSubmitting(false)
                                    }, 3000);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        <Input label="نام" type="text" name="name" placeholder="امیر دانش" />
                                        <Input label="نام کاربری" type="text" name="username" placeholder="Amirdanesh" />
                                        <Input label="شماره تلغن " type="text" name="phone" placeholder="09123456789" />
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
                                            <NavLink to="/login" className=" text-gray-500 dark:text-gray-400 p-2 rounded-lg font-DanaMedium">ورود </NavLink>
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
