import React, { useEffect, useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataUrlV1, DataUrl } from "../../../Data/Data"
import { productValidate, productEditValidate } from '../../../Components/Input/Validate.js'

import Input from '../../../Components/Input/Input.jsx'
import Table from '../../../Components/Table/Table.jsx'
import Modal from '../../../Components/Modal/Modal.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import swal from 'sweetalert'

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectProductCover, setSelectProductcover] = useState("")
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowEditToast, setIsShowEditToast] = useState(false)
  const [selectProduct, setSelectProduct] = useState([])
  const [categories, setCategories] = useState([])
  const closeModal = () => setIsShowModal(false)
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))

  const getProducts = () => {
    fetch(`${DataUrlV1}/courses`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }

  const editProduct = (id, productNewData) => {
    fetch(`${DataUrlV1}/courses/${id} `, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${LocalStorageData.token} `
      },
      body: JSON.stringify(productNewData)
    }).then(res => res.json())
      .then(data => {
        getProducts()
        setIsShowEditToast(true)
        setIsShowModal(false)
        setTimeout(() => {
          setIsShowEditToast(false)
        }, 2000);
      })
  }

  const removeProducts = (id) => {
    swal({
      title: "آیا از حدف این محصول مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      // console.log(id)
      if (res) {
        fetch(`${DataUrlV1}/courses/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            getProducts()
          })
      }
    })
  }

  useEffect(() => {
    getProducts()
    fetch(`${DataUrlV1}/category`)
      .then(res => res.json())
      .then(data => {
        setCategories(data)

      })
  }, [])


  return (
    <>
      {/* New Product Field */}
      <Formik
        validate={productValidate}
        initialValues={{ name: "", shortName: "", description: "", price: "", status: "", categoryID: "", cover: "" }}
        onSubmit={(values , { setSubmitting }) => {
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
              setTimeout(() => {
                setSubmitting(false)
              }, 3000);
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

      </Formik>
      {/* Product List */}
      <Table
        children={
          products.map((product) => (
            // console.log(product)
            <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src={`${DataUrl}/courses/covers/${product.cover}`} alt="" className='w-[120px]' />
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </th>
              <td className="px-2 py-2">
                {product.price.toLocaleString()}
              </td>
              <td className="px-2 py-2">
                {product.creator}
              </td>
              <td className="px-2 py-2 mt-6 flex">
                <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                  setSelectProduct(product)
                  setSelectProductcover(product.cover)
                  setIsShowModal(true)
                }}>ویرایش</button>
                <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                  setSelectProduct(product)
                  removeProducts(selectProduct._id)
                }}>حذف</button>
                <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => { console.log("edit") }}>جزئیات</button>
              </td>
            </tr>
          ))
        }>
      </Table>
      {/* Modal for editing Products */}
      {isShowModal && <Modal title="محصول" onHide={closeModal}
        children={
          <>
            <div className="p-6 space-y-6">
              <Formik
                validate={productEditValidate}
                initialValues={{ name: `${selectProduct.name}`, shortName: `${selectProduct.shortName}`, description: `${selectProduct.description}`, price: `${selectProduct.price}`, status: `${selectProduct.status}`, categoryID: `${selectProduct.categoryID._id}`, cover: '' }}
                onSubmit={(values, { setSubmitting }) => {
                  if (values.cover === '') {
                    values.cover = selectProductCover;
                  } else {
                    const formData = new FormData();
                    Object.entries(values).forEach(([key, value]) => {
                      formData.append(key, value);
                    });
                    formData.append('cover', event.target.elements.cover.files[0]);
                  }

                  editProduct(selectProduct._id, values)



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
            {/* <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 " onClick={() => {
                console.log(isSubmitting)
              }}>ویرایش</button>
              <button type="button" className="text-white bg-red-700 hover:bg-red-800 rounded-lg border text-sm px-5 py-2.5  focus:z-10 dark:bg-red-600 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-red-700 ">بستن</button>
            </div> */}
          </>
        }
      />}

      {
        isShowEditToast && <Toast title="محصول با موفقیت ویرایش شد" />
      }

    </>
  )
}
