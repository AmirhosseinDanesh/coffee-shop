import React from 'react'
import i18n from 'i18next'
import { Formik, Form, Field } from 'formik'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Toast from '../../../Components/Toast/Toast';

export default function Setting() {
    const { t } = useTranslation()
    return (
        <>
            <Formik
                initialValues={{ lang: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    i18n.changeLanguage(values.lang)
                    if (values.lang == "en") {
                        localStorage.setItem("lang", "en")
                        toast.info("Language changed to English")

                    } else {
                        localStorage.setItem("lang", "fa")
                        toast.info("زبان به فارسی تغییر کرد.")

                    }
                }
                }>
                {({ isSubmitting }) => (
                    <Form className="text-sm md:text-lg">
                        <div className='space-y-1 md:space-y-1 grid gap-2 mb-6 grid-cols-1 md:grid-cols-4 mt-5'>
                            <div className=''>
                                <Field as="select" name="lang" className="input">
                                    <option value="-1">{t("chooseLang")}</option>
                                    <option value="fa">{t("persian")}</option>
                                    <option value="en">{t("english")}</option>
                                </Field>
                            </div>
                            <div className='text-center md:text-right '>
                                <button type="submit" className="w-full md:w-1/4 h-10 p-2.5 rounded-lg text-center font-DanaMedium text-white bg-blue-700">
                                    ثبت
                                </button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>

            <Toast />
        </>
    )
}
