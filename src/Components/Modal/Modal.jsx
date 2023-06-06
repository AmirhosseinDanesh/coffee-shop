import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { productValidate } from '../../Components/Input/Validate.js'
import Input from "../Input/Input.jsx"

export default function Modal() {
    return (
        <>
            <div className="hidden justify-center fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                ویرایش محصول
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <Formik
                                validate={productValidate}
                                initialValues={{ name: "", shortName: "", description: "", price: "", status: "", categoryID: "", cover: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values)
                                    setTimeout(() => {
                                        setSubmitting(false)
                                    }, 3000);
                                }} >
                                {({ isSubmitting }) => (
                                    <div className='mt-5'>
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
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 ">ویرایش</button>
                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 rounded-lg border text-sm px-5 py-2.5  focus:z-10 dark:bg-red-600 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-red-700 ">بستن</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
