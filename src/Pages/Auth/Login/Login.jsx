import React, { useState, useContext } from 'react'
import PanelNav from "../../../Components/PanelNav/PanelNav.jsx"

import { NavLink } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Input from '../../../Components/Input/Input.jsx'
import { loginValidate } from '../../../Components/Input/Validate.js'
import { DataUrlV1 } from '../../../Data/Data.js'
import swal from "sweetalert";
import AuthContext from '../../../Context/authContext.js'
import {  useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState("")
    const auth = useContext(AuthContext)
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
                                            // auth.login([], data.accessToken)
                                            swal({
                                                title: "با موفقیت وارد شدید",
                                                icon: "success",
                                                buttons: "ورود به پنل",
                                            }).then(() => {
                                                auth.login({}, data.accessToken);
                                                navigate("/p-admin");
                                            });
                                        })
                                        .catch(err => {
                                            // setErrorText(err)
                                            console.log(err)
                                        })



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
