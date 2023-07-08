import React, { useEffect, useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataUrlV1, DataUrl } from "../../../Data/Data"
import { productValidate, productEditValidate } from '../../../Components/Input/Validate.js'
import { toast } from 'react-toastify';
import Pagination from '../../../Components/Pagination/Pagination';
import Input from '../../../Components/Input/Input.jsx'
import Table from '../../../Components/Table/Table.jsx'
import Modal from '../../../Components/Modal/Modal.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import swal from 'sweetalert'
import Editor from '../../../Components/Editor/Editor'
import Search from '../../../Components/Search/Search';
export default function Products() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [products, setProducts] = useState([])
  const [selectProductCover, setSelectProductcover] = useState("")
  const [selectProduct, setSelectProduct] = useState([])
  const [selectEditProduct, setSelectEditArticles] = useState("")
  const [categories, setCategories] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [articleBody, setArticleBody] = useState("")
  const closeModal = () => setIsShowModal(false)
  const [currentItems, setCurrentItems] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([]);
  const getProducts = () => {
    fetch(`${DataUrlV1}/courses`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })

  }


  const removeProducts = (id) => {
    swal({
      title: "آیا از حدف این محصول مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
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
            toast.error("محصول با موفقیت حدف شد.")
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
        initialValues={{ name: "", shortName: "", description: "", price: "", status: "start", categoryID: "", cover: "", discount: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {

          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formData.append('cover', event.target.elements.cover.files[0]);
          formData.append('description', articleBody);

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
              toast.success("محصول با موفقیت ادد شد.")
              resetForm()
              setSubmitting(false)
              setArticleBody("")
            })
        }} >
        {({ isSubmitting }) => (
          <div className='mt-5 text-sm md:text-lg'>
            <span href="#" className="mb-6 text-gray-900 dark:text-white">
              اضافه کردن محصول جدید
            </span>
            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
              <Input label="نام محصول" type="text" name="name" placeholder="محصول اول" />
              <Input label="لینک محصول" type="text" name="shortName" placeholder="product1" />
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
                <label className="input-label">عکس محصول</label>
                <Field type="file" name="cover" className="input"></Field>
                <ErrorMessage name="cover">
                  {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                </ErrorMessage>
              </div>
              <Input label="تخفیف محصول" type="text" name="discount" placeholder="10" />
              <div className='col-start-1 md:col-end-3 w-[99%]'>
                <label className="input-label">متن مقاله</label>

                <Editor
                  value={articleBody}
                  setValue={setArticleBody}
                />
              </div>
              <div className='col-start-1 md:col-end-3'>
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
      {/* Product List */}
      <Search data={products} value="name" setFilteredProducts={setFilteredProducts} placeholder={"نام محصول مورد نظر را بنویسید ..."} />
      {
        (products.length) ? (
          <>
            <Table
              childrenTH={
                <tr>
                  <th scope="col" className="px-2 py-3">
                    عکس محصول
                  </th>
                  <th scope="col" className="px-2 py-3">
                    نام محصول
                  </th>
                  <th scope="col" className="px-2 py-3">
                    قیمت محصول
                  </th>
                  <th scope="col" className="px-2 py-3">
                    دسته بندی
                  </th>
                  <th scope="col" className="px-2 py-3">
                    ویرایش
                  </th>
                </tr>
              }
              childrenTD={
                currentItems.map((product) => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img src={`${DataUrl}/courses/covers/${product.cover}`} alt="" className='w-[120px]' />
                    </th>
                    <th scope="row" className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.name}
                    </th>
                    <td className="px-2 py-2">
                      {product.price.toLocaleString()}
                    </td>
                    <td className="px-2 py-2">
                      {product.categoryID.title}
                    </td>
                    <td className="px-2 py-2">
                      <div className='flex'>
                        <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                          setSelectProduct(product)
                          setSelectProductcover(product.cover)
                          setIsShowModal(true)
                        }}>ویرایش</button>
                        <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                          removeProducts(product._id)
                        }}>حذف</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            />

            <Pagination
              data={filteredProducts}
              items={currentItems}
              setItems={setCurrentItems}
            />
          </>
        ) : (
          <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
            محصولی موجود نیست از طریق فرم بالا میتوانید اولین محصول خود را اضافه کنید.
          </div >
        )
      }

      {/* Modal for editing Products */}
      {
        isShowModal && <Modal title="ویرایش محصول" onHide={closeModal}
          children={
            <>
              <div className="p-6 space-y-6">
                <Formik
                  validate={productEditValidate}
                  initialValues={{ name: `${selectProduct.name}`, shortName: `${selectProduct.shortName}`, description: selectProduct.description, price: `${selectProduct.price}`, status: "start", categoryID: `${selectProduct.categoryID._id}`, cover: '', discount: selectProduct.discount }}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(selectProduct.description)
                    const formData = new FormData();
                    formData.append('name', values.name);
                    formData.append('shortName', values.shortName);
                    formData.append('description', selectEditProduct);
                    formData.append('price', values.price);
                    formData.append('status', "start");
                    formData.append('discount', values.discount);
                    formData.append('categoryID', values.categoryID);
                    if (selectProductCover) {
                      formData.append('cover', selectProductCover);
                    }
                    fetch(`${DataUrlV1}/courses/${selectProduct._id}`, {
                      method: "PUT",
                      headers: {
                        'Authorization': `Bearer ${LocalStorageData.token}`
                      },
                      body: formData
                    })
                      .then(res => res.json())
                      .then(data => {
                        getProducts()
                        toast.success("محصول با موفقیت ویرایش شد.")
                        setIsShowModal(false)
                        setSubmitting(false)
                      })

                  }} >
                  {({ isSubmitting }) => (
                    <div className='mt-5'>
                      <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                        <Input label="نام محصول" type="text" name="name" placeholder="محصول اول" />
                        <Input label="لینک محصول" type="text" name="shortName" placeholder="product1" />
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
                          <label className="input-label">عکس محصول</label>
                          <Field type="file" name="cover" className="input" onChange={(event) => {
                            setSelectProductcover(event.target.files[0]);
                          }} />
                          <ErrorMessage name="cover">
                            {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                          </ErrorMessage>
                        </div>
                        <Input label="تخفیف محصول" type="text" name="discount" placeholder="10" />
                        <div className='col-start-1 md:col-end-3 w-[99%]'>
                          <label className="input-label">متن مقاله</label>
                          <Editor
                            value={(typeof (selectProduct.description) == "string") ? (selectProduct.description) : (selectProduct.description[0])}
                            setValue={setSelectEditArticles}
                          />
                        </div>
                        <div className='col-start-1 md:col-end-3'>
                          <label className="input-label">ثبت </label>
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
      <Toast />
    </>
  )
}
