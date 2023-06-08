import React, { useEffect, useState } from 'react'
import Table from '../../../Components/Table/Table'

import { DataUrlV1, DataUrl } from "../../../Data/Data"

export default function Articles() {
  const [articles, setArticles] = useState([])

  const getArticles = () => {
    fetch(`${DataUrlV1}/articles`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setArticles(data)
      })
  }

  useEffect(() => {
    getArticles()
  }, [])
  return (
    <>
      <Formik
        // validate={productValidate}
        initialValues={{ title: "", shortName: "", description: "", price: "", status: "", categoryID: "", cover: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {

          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formData.append('cover', event.target.elements.cover.files[0]);

          fetch(`${DataUrlV1}/courses/`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${LocalStorageData.token} `
            },
            body: formData
          })
            .then(res => res.json())
            .then(data => {
              getProducts()
              setIsShowToast(true)
              setToastMessage("محصول با موفقیت اضافه شد")
              setTimeout(() => {
                resetForm()
                setSubmitting(false)
                setIsShowToast(false)
              }, 2000);
            })




        }} >
        {({ isSubmitting }) => (
          <div className='mt-5'>
            <span href="#" className="mb-6 text-xl text-gray-900 dark:text-white">
              اضافه کردن محصول جدید
            </span>
            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
              <Input label="نام محصول" type="text" name="name" placeholder="محصول اول" />
              <Input label="لینک محصول" type="text" name="shortName" placeholder="product1" />
              <Input label="توضیحات محصول" type="text" name="description" placeholder="این محصول برای تمامی افراد ..." />
              <Input label="قیمت محصول" type="text" name="price" placeholder="21,000,000" />
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

      </Formik >
      <Table
        childrenTH={
          <tr>
            <th scope="col" className="px-6 py-3 ">
              عکس مقاله
            </th>
            <th scope="col" className="px-6 py-3 ">
              نام مقاله
            </th>
            <th scope="col" className="px-6 py-3 ">
              توضیحات مقاله
            </th>
            <th scope="col" className="px-6 py-3 ">
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
              <td className="px-2 py-2 break-normal">
                {art.description}
              </td>
              <td className="px-2 py-2 mt-6 flex">
                <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                  // setSelectProduct(product)
                  // setSelectProductcover(product.cover)
                  // setIsShowModal(true)
                }}>ویرایش</button>
                <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                  // setSelectProduct(product)
                  // removeProducts(product._id)
                }}>حذف</button>
                <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => { console.log("edit") }}>جزئیات</button>
              </td>
            </tr>
          ))
        }
      />

    </>
  )
}
