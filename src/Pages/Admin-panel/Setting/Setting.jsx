import React from 'react'
import i18n from 'i18next'
import { Formik, Form, Field } from 'formik'
import { useTranslation } from 'react-i18next';
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
                    } else {
                        localStorage.setItem("lang", "fa")
                    }
                }
                }>
                {({ isSubmitting }) => (
                    <Form className="">
                        <div className='space-y-1 md:space-y-1 grid gap-2 mb-6 grid-cols-1 md:grid-cols-4 mt-5'>
                            <div className='flex justify-between items-end'>
                                <div>

                                    <Field as="select" name="lang" className="input">
                                        <option value="-1">{t("chooseLang")}</option>
                                        <option value="fa">{t("persian")}</option>
                                        <option value="en">{t("english")}</option>
                                    </Field>
                                </div>
                                <button type="submit" className="w-16 h-10 p-2.5 rounded-lg text-sm text-center font-DanaMedium text-white bg-blue-700">
                                    ثبت
                                </button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    )
}
