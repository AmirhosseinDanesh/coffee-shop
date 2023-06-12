import React, { useEffect, useState } from 'react'

import Table from '../../../Components/Table/Table'
import Input from '../../../Components/Input/Input.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import Modal from '../../../Components/Modal/Modal.jsx'
import swal from 'sweetalert'
import Editor from '../../../Components/Editor/Editor'
import ErrorToast from "../../../Components/Toast/ErrorToast"
import DOMPurify from 'dompurify'


import { articleValidate, articleEditValidate } from '../../../Components/Input/Validate.js'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataUrlV1, DataUrl } from "../../../Data/Data"

export default function Articles() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [categories, setCategories] = useState([])

  const [isShowErrToast, setIsShowErrToast] = useState(false)
  const [isShowToast, setIsShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [articles, setArticles] = useState([])
  const [articleBody, setArticleBody] = useState("")
  const [selectArticlesCover, setSelectArticlescover] = useState("")
  const [selectArticles, setSelectArticles] = useState([])

  const closeModal = () => {
    setIsShowModal(false)
    setIsShowDetailModal(false)
  }

  const getArticles = () => {
    fetch(`${DataUrlV1}/articles`)
      .then(res => res.json())
      .then(data => {
        setArticles(data)
      })
  }

  const removeArticles = (id) => {
    swal({
      title: "آیا از حدف این مقاله مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      if (res) {
        fetch(`${DataUrlV1}/articles/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            getArticles()
            setIsShowToast(true)
            setToastMessage("مقاله با موفقیت حذف شد")
            setTimeout(() => {
              setIsShowToast(false)
            }, 2000);
          })
      }
    })
  }

  useEffect(() => {
    getArticles()
    fetch(`${DataUrlV1}/category`)
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })

    if (isShowToast || isShowErrToast) {
      setTimeout(() => {
        setIsShowToast(false);
        setIsShowErrToast(false);
      }, 2000);
    }
  }, [isShowToast, isShowErrToast])
  return (
    <>
      {/* add new Articles */}
      <Formik
        validate={articleValidate}
        initialValues={{ title: "", description: "", body: "", shortName: "", categoryID: "", cover: "", status: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formData.append('cover', event.target.elements.cover.files[0]);
          formData.append('body', articleBody);


          if (values.status == "draft") {
            fetch(`${DataUrlV1}/articles/draft`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${LocalStorageData.token} `
              },
              body: formData
            })
              .then(res => {
                if (!res.ok) {
                  setIsShowErrToast(true)
                  setToastMessage("مقاله اضافه نشد")
                  setSubmitting(false)
                } else {
                  
                  res.json()
                    .then(data => {
                      getArticles()
                      setIsShowToast(true)
                      setToastMessage("مقاله با موفقیت پیش نویس شد")
                      setTimeout(() => {
                        resetForm()
                        setSubmitting(false)
                        
                      }, 2000);
                    })
                }
              })
          } else if (values.status == "upload") {
            fetch(`${DataUrlV1}/articles/`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${LocalStorageData.token} `
              },
              body: formData
            })
              .then(res => {
                if (!res.ok) {
                  setIsShowErrToast(true)
                  setToastMessage("مقاله اضافه نشد")
                  setSubmitting(false)
                } else {
                  res.json()
                    .then(data => {
                      getArticles()
                      setIsShowToast(true)
                      setToastMessage("مقاله با موفقیت آپلود شد")
                      setTimeout(() => {
                        resetForm()
                        setSubmitting(false)
                        setArticleBody("")
                      }, 2000);
                    })
                }
              })
          }
        }} >

        {({ isSubmitting }) => (
          <div className='mt-5 text-sm md:text-lg'>
            <span href="#" className="mb-6 text-gray-900 dark:text-white">
              اضافه کردن مقاله جدید
            </span>
            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
              <Input label="موضوع مقاله" type="text" name="title" placeholder="ری اکت یا ویو ؟" />
              <Input label="توضیحات مقاله" type="text" name="description" placeholder="بررسی دو فریم ورک محبوب جاوا اسکریپت" />
              <Input label="لینک مقاله" type="text" name="shortName" placeholder="react-or-vue" />
              <div>
                <label className="input-label">دسته بندی</label>
                <Field as="select" name="categoryID" className="input">
                  <option value="-1">دسته بندی را انتخاب کنید</option>
                  {
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.title}</option>
                    ))
                  }
                </Field>
                <ErrorMessage name="categoryID">
                  {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                </ErrorMessage>
              </div>
              <div>
                <label className="input-label">عکس مقاله</label>
                <Field type="file" name="cover" className="input"></Field>
                <ErrorMessage name="cover">
                  {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                </ErrorMessage>
              </div>
              <div>
                <label className="input-label">وضعیت مقاله</label>
                <Field as="select" name="status" className="input">
                  <option value="-1">وضعیت  را انتخاب کنید</option>
                  <option value="upload">انتشار در لحظه</option>
                  <option value="draft">پیش نویس</option>
                </Field>
                <ErrorMessage name="status">
                  {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                </ErrorMessage>
              </div>
              <div className='col-start-1 md:col-end-3 w-[99%]'>
                <Editor
                  value={articleBody}
                  setValue={setArticleBody}
                />
              </div>

              <div className='col-start-1 md:col-end-3 '>
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
      </Formik >
      {/* list of articles */}
      {
        (articles.length) ? (
          <Table
            childrenTH={
              <tr>
                <th scope="col" className="px-3 py-3">
                  عکس مقاله
                </th>
                <th scope="col" className="px-3 py-3">
                  موضوع مقاله
                </th>
                <th scope="col" className="px-3 py-3">
                  توضیح کوتاه
                </th>
                <th scope="col" className="px-3 py-3">
                  وضعیت
                </th>
                <th scope="col" className="px-3 py-3">
                  ویرایش
                </th>
              </tr>
            }
            childrenTD={
              articles.map((art) => (
                <tr key={art._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-2 py-2">
                    <img src={`${DataUrl}/courses/covers/${art.cover}`} alt="" className='w-[100px]' />
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {art.title}
                  </th>
                  <td className="px-2 py-5 break-normal line-clamp-3">
                    {art.description}
                  </td>
                  <td className="px-2 py-2">
                    <div className='flex justify-center'>
                      {(art.publish) ?
                        (
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>

                        )
                        :
                        (
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        )}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className='flex'>
                      <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        setSelectArticles(art)
                        setSelectArticlescover(art.cover)
                        setIsShowModal(true)
                      }}>ویرایش</button>
                      <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        removeArticles(art._id)
                      }}>حذف</button>
                      <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        setSelectArticles(art)
                        setIsShowDetailModal(true)
                      }}>جزئیات</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          />
        ) : (
          <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
            مقاله ای موجود نیست از طریق فرم بالا میتوانید اولین مقاله خود را اضافه کنید.
          </div>
        )
      }
      {/* EditModal */}
      {
        isShowModal && <Modal title="ویرایش مقاله" onHide={closeModal}
          children={
            <>
              <div className="p-6 space-y-6">
                <Formik
                  validate={articleEditValidate}
                  initialValues={{ title: `${selectArticles.title}`, description: `${selectArticles.description}`, body: `${selectArticles.body}`, shortName: `${selectArticles.shortName}`, categoryID: `${selectArticles.categoryID._id}`, cover: '' }}
                  onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('description', values.description);
                    formData.append('body', values.body);
                    formData.append('shortName', values.shortName);
                    formData.append('categoryID', values.categoryID);
                    if (selectArticlesCover) {
                      formData.append('cover', selectArticlesCover);
                    }

                    // editArticle(selectArticles._id, formData)
                    fetch(`${DataUrlV1}/articles/${selectArticles._id}`, {
                      method: "PUT",
                      headers: {
                        'Authorization': `Bearer ${LocalStorageData.token}`
                      },
                      body: formData
                    })
                      .then(res => console.log(res))
                    // .then(data => {
                    //   getArticles()
                    //   setIsShowToast(true)
                    //   setToastMessage("مقاله با موفقیت ویرایش شد")
                    //   setIsShowModal(false)
                    //   setTimeout(() => {
                    //     setIsShowToast(false)
                    //     setSubmitting(false)
                    //   }, 2000);
                    // })

                  }} >
                  {({ isSubmitting }) => (
                    <div className='mt-5'>
                      <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                        <Input label="موضوع مقاله" type="text" name="title" placeholder="ری اکت یا ویو ؟" />
                        <Input label="توضیحات مقاله" type="text" name="description" placeholder="بررسی دو فریم ورک محبوب جاوا اسکریپت" />
                        <Input label="متن مقاله" type="text" name="body" placeholder="اولین موضوعی که باید در مورد ..." />
                        <Input label="لینک مقاله" type="text" name="shortName" placeholder="react-or-vue" />
                        <div>
                          <label className="input-label">دسته بندی</label>
                          <Field as="select" name="categoryID" className="input">
                            <option value="-1">دسته بندی را انتخاب کنید</option>
                            {
                              categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.title}</option>
                              ))
                            }
                          </Field>
                          <ErrorMessage name="categoryID">
                            {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                          </ErrorMessage>
                        </div>
                        <div>
                          <label className="input-label">عکس محصول</label>
                          <Field type="file" name="cover" className="input" onChange={(event) => {
                            setSelectArticlescover(event.target.files[0]);
                          }} />
                          <ErrorMessage name="cover">
                            {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                          </ErrorMessage>
                        </div>
                        <div className=''>
                          <label className="input-label">تغییر وضعیت</label>
                          <button type="submit"
                            className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? ("لطفا صبر کنید ...") : ("ویرایش کردن")}
                          </button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
            </>
          }
        />
      }

      {/* Detail Modal */}
      {
        isShowDetailModal && <Modal title="متن مقاله" onHide={closeModal}
          children={
            <div className='p-5 mt-3 text-gray-900 dark:text-gray-200'>
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectArticles.body) }}>
              </p>
            </div>
          }
        />
      }


      {/* Toast */}

      {
        isShowToast && <Toast title={toastMessage} />
      }
      
      {
        isShowErrToast && <ErrorToast title={toastMessage} />
      }
    </>
  )
}
