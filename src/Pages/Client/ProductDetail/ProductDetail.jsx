import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'

import { NavLink, useParams } from 'react-router-dom'
import { DataUrl, DataUrlV1 } from '../../../Data/Data'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { commentvalue } from "../../../Components/Input/Validate"

import AuthContext from '../../../Context/authContext'
import DOMPurify from 'dompurify'
import swal from 'sweetalert';

import ProductsContext from '../../../Context/ProductsContext'

export default function ProductDetail() {
  const contextData = useContext(ProductsContext)

  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [productDetail, setProductDetail] = useState([])
  const { shortName } = useParams()
  const auth = useContext(AuthContext)
  const updateLocalStorage = (cart) => {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }
  const addToCart = (pro) => {
    let newUserProductCart = {
      id: pro._id,
      name: pro.name,
      price: pro.price,
      count: 1,
      cover: pro.cover,
    }

    let isProductInCart = contextData.userCart.some(product => (
      product.name === pro.name
    ))
    if (!isProductInCart) {
      let updatedCart = [...contextData.userCart, newUserProductCart];
      updateLocalStorage(updatedCart);
      contextData.setUserCart(updatedCart);

    } else {
      let updatedCart = contextData.userCart.map(product => {
        if (product.name === pro.name) {
          return {
            ...product,
            count: product.count + 1

          };
        }

        return product;
      });

      contextData.setUserCart(updatedCart);
      updateLocalStorage(updatedCart);
    }
  }

  useEffect(() => {
    fetch(`${DataUrlV1}/courses/${shortName}`)
      .then(res => res.json())
      .then(data => {
        setProductDetail(data)
      })
  }, [])
  return (
    <>
      <Header />

      <div className='md:mt-40 container py-10 flex flex-col-reverse md:flex-row justify-around items-center'>
        <div className='w-full md:w-1/2 text-gray-950 dark:text-white flex flex-col gap-y-5 mt-16 md:mt-0'>
          <h3 className="flex gap-x-2 text-gray-600 dark:text-gray-400 font-DanaBold" >
            {
              (productDetail.categoryID) ? (
                <>
                  <NavLink className="underline hover:text-gray-900 hover:dark:text-white text-sm md:text-base" to="/">خانه</NavLink>
                  <span className=''>/</span>
                  <NavLink className="underline hover:text-gray-900 hover:dark:text-white text-sm md:text-base" to="/shop">فروشگاه</NavLink>
                  <span className=''>/</span>
                  <NavLink className="underline hover:text-gray-900 hover:dark:text-white text-sm md:text-base" to={`/category/${productDetail.categoryID.name}`}>{productDetail.categoryID.title}</NavLink>
                </>
              ) : (
                <>
                </>
              )
            }

          </h3>
          <div className='flex justify-between items-center '>
            <h2 className='text-3xl font-MorabbaMedium'>{productDetail.name}</h2>
            <span className='text-2xl'>{
              (productDetail.price) ? (
                (productDetail.discount !== 0) ? (
                  <>
                    <div className='text-gray-700 dark:text-white'>
                      <span className='font-DanaMedium text-sm md:text-2xl'>{(productDetail.price - ((productDetail.discount * productDetail.price) / 100)).toLocaleString()}</span>
                      <span className='text-xs tracking-tighter mr-0.5'>تومان</span>
                    </div>
                    <div className='offer text-gray-400/80 flex justify-center items-center'>
                      <span className='text-xs md:text-lg'>{productDetail.price.toLocaleString()}</span>
                      <span className='hidden xl:inline text-sm tracking-tighter mr-0.5'>تومان</span>
                    </div>
                  </>
                ) : (
                  (productDetail.price.toLocaleString())
                )
              ) : (
                <>
                </>
              )
            }
            </span>
          </div>
          <p className='text-sm md:text-base leading-7 md:leading-9 font-DanaMedium tracking-wide' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}>

          </p>
          <div>
            <button className='input-submit bg-blue-600' onClick={() => {
              addToCart(productDetail)
            }}>
              اضافه کردن به سبد خرید
            </button>
          </div>
        </div>
        <div className='w-full md:w-1/2 mt-10'>
          <img className='w-65 mx-auto md:w-auto rounded-lg' src={`${DataUrl}/courses/covers/${productDetail.cover}`} alt="" />
        </div>
      </div >

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className=" mx-auto px-4 divide-y divide-gray-800 dark:divide-white/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">نظرات <span>{ }</span></h2>
          </div>
          {
            (auth.isLoggedIn == true) ? (
              <div className="mb-6">
                <div className="py-8 px-4 mb-4 bg-white rounded-lg rounded-t-lg  dark:bg-gray-900 ">
                  <Formik
                    validate={commentvalue}
                    initialValues={{ body: "", score: "" }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      const newCm = {
                        body: values.body,
                        courseShortName: shortName,
                        score: values.score
                      }
                      fetch(`${DataUrlV1}/comments`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          'Authorization': `Bearer ${LocalStorageData.token}`
                        },
                        body: JSON.stringify(newCm)
                      }).then(res => res.json())
                        .then(data => {
                          setTimeout(() => {
                            resetForm()
                            setSubmitting(false)
                            swal({
                              title: "کامنت با موفقیت ثبت شد ، پس از تایید شدن نمایش داده می شود."
                            })
                          }, 1000);
                        })

                    }
                    }>
                    {({ isSubmitting }) => (
                      <Form className="">
                        <div>
                          <label className="input-label">امتیاز</label>
                          <Field as="select" name="score" className="input">
                            <option value="-1">امتیاز خود را وارد کنید</option>
                            <option value="5">عالی</option>
                            <option value="4">خیلی خوب</option>
                            <option value="3">متوسط</option>
                            <option value="2">ضعیف</option>
                            <option value="1">بد</option>

                          </Field>
                          <ErrorMessage name="score">
                            {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                          </ErrorMessage>
                        </div>
                        <div className='my-5'>
                          <Field as="textarea" name='body' className="input" placeholder="نظر خود را در مورد این محصول بنویسید ..." required>
                          </Field>
                          <ErrorMessage name="body">
                            {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
                          </ErrorMessage>
                        </div>


                        <button type="submit"
                          className={isSubmitting ? ("input-submit bg-blue-500") : ("input-submit bg-blue-600")}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? ("لطفا صبر کنید ...") : ("ثبت")}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>

              </div>
            ) : (
              <div className='bg-gray-700 p-3 rounded-xl text-center text-white'>
                برای نظر دادن ابتدا باید در سایت ثبت‌نام یا ورود کنید
              </div>
            )
          }

          {
            (productDetail.comments) ?
              (
                productDetail.comments.map((cm) => (
                  <article key={cm._id} className="p-6 mb-2 text-xs md:text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="">
                      <div className="flex items-center justify-between">
                        <div className='flex'>
                          <p className="inline-flex items-center ml-3 text-gray-900 dark:text-white gap-x-1">{cm.creator.name}
                            <span>
                              {
                                (cm.creator.role === "ADMIN") ? ("(ادمین)") : ("(کاربر)")
                              }
                            </span>
                          </p>
                          <p className="text-xs md:text-base text-gray-600 dark:text-gray-400">
                            <span>{cm.createdAt.slice(0, 10)}</span>
                          </p>
                        </div>
                        <div className='flex line-clamp-2'>
                          {
                            Array(5 - cm.score).fill(0).map(star => (
                              <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            ))
                          }
                          {
                            Array(cm.score).fill(0).map(star => (
                              <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            ))
                          }
                        </div>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400 my-4">{cm.body}</p>
                    {
                      (cm.answerContent) ? (
                        <article className="p-6 mb-2 ml-6 lg:ml-12 text-xs md:text-base bg-white rounded-lg dark:bg-gray-900">
                          <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex items-center ml-3 text-sm text-gray-900 dark:text-white">{cm.answerContent.creator.name}
                                <span>
                                  {
                                    (cm.answerContent.creator.role === "ADMIN") ? ("(ادمین)") : ("کاربر ")
                                  }
                                </span>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span>{cm.createdAt.slice(0, 10)}</span>
                              </p>
                            </div>
                          </footer>
                          <p className="text-gray-500 dark:text-gray-400 my-4">{cm.answerContent.body}</p>
                        </article>
                      ) : (
                        <>
                        </>
                      )
                    }
                  </article>
                ))
              ) : (
                <div>
                  هنوز کامنتی ثبت نشده است
                </div>
              )
          }
          {/* cm with ans */}
          {/* <article className="p-6 mb-6 mt-10 text-base bg-white rounded-lg dark:bg-gray-900 ">
            <div className='mb-5 '>
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center ml-3 text-sm text-gray-900 dark:text-white">امیرحسین دانش</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span>1378/2/12</span>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">به نظرم محصول خوبی بود</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center text-sm text-gray-500 hover:dark:text-white dark:text-gray-400">
                  <svg aria-hidden="true" className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  جواب دادن
                </button>
              </div>
            </div>
            <article className="p-6 mb-2 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center ml-3 text-sm text-gray-900 dark:text-white">مدیر سایت</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span>1402/2/2</span>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">ممنون از نظر شما</p>
              <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                  className="flex items-center text-sm text-gray-500 hover:dark:text-white  dark:text-gray-400">
                  <svg aria-hidden="true" className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  جواب دادن
                </button>
              </div>
            </article>
          </article> */}

          {/* cm khali */}
          {/* <article className="p-6 mb-2 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center ml-3 text-sm text-gray-900 dark:text-white">امیرحسین دانش</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span>1378/2/12</span>
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">به نظرم محصول خوبی بود</p>
            <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                className="flex items-center text-sm text-gray-500 hover:dark:text-white  dark:text-gray-400">
                <svg aria-hidden="true" className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                جواب دادن
              </button>
            </div>
          </article> */}
        </div>
      </section>
    </>

  )
}
