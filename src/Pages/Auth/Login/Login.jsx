import React, { useState, useContext } from 'react'
import PanelNav from "../../../Components/PanelNav/PanelNav.jsx"
import Input from '../../../Components/Input/Input.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"

import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik'

import { loginValidate } from '../../../Components/Input/Validate.js'
import AuthContext from '../../../Context/authContext.js'
import { DataUrlV1 } from '../../../Data/Data.js'

export default function Login() {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState("")
    const auth = useContext(AuthContext)
    const [isShowToast, setIsShowToast] = useState(false)
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
                            <p>
                                {errorText}
                            </p>
                            <Formik
                                validate={loginValidate}
                                initialValues={{ email: "", password: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    const userDataForLogin = {
                                        identifier: values.email,
                                        password: values.password,
                                    }

                                    fetch(`${DataUrlV1}/auth/login`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(userDataForLogin)
                                    })
                                        .then(res => {
                                            if (!res.ok) {
                                                return res.text()
                                                    .then(text => {
                                                        throw new Error(text)
                                                    })
                                            } else {
                                                return res.json()
                                            }
                                        })
                                        .then(data => {
                                            auth.login([], data.accessToken)

                                            setIsShowToast(true)
                                            setTimeout(() => {
                                                navigate("/p-admin/dashboard");
                                            }, 1500);

                                        })
                                        .catch(err => {
                                            // setErrorText(err)
                                            console.log(err)
                                        })
                                }
                                }>
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
            {
                isShowToast && <Toast
                    title="با موفقیت وارد شدید"
                    bgColor="bg-blue-100"
                    darkBgColor="bg-blue-800"
                    svg={<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    }
                />
            }

        </>
    )
}
