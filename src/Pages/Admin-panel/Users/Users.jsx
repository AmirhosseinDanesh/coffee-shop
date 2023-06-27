import React, { useState, useEffect } from 'react'

import Modal from '../../../Components/Modal/Modal.jsx'
import Table from '../../../Components/Table/Table.jsx'
import Toast from "../../../Components/Toast/Toast.jsx"
import Input from '../../../Components/Input/Input.jsx'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataUrlV1 } from "../../../Data/Data"
import { registerValidate } from '../../../Components/Input/Validate.js'
import { toast } from 'react-toastify';
import Pagination from '../../../Components/Pagination/Pagination.jsx'
import Search from '../../../Components/Search/Search.jsx'

export default function Users() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [users, setUsers] = useState([])
  const [selectUsers, setSelectUsers] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [currentItems, setCurrentItems] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

  const closeModal = () => setIsShowModal(false)


  const getUsers = () => {
    fetch(`${DataUrlV1}/users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${LocalStorageData.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setFilteredProducts(data)
      })
  }

  const removeUser = (id) => {
    swal({
      title: "آیا از حدف این کاربر مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      if (res) {
        fetch(`${DataUrlV1}/users/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
        })
          .then(res => {
            if (!res.ok) {
              toast.error("کاربر حذف نشد مشکلی پیش آمده!")
            } else {
              res.json()
                .then(data => {
                  getUsers()
                  toast.warning("کاربر با موفقیت حذف شد")
                })
            }
          })

      }
    })
  }

  const banUser = (id) => {
    swal({
      title: "آیا از بن این کاربر مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      if (res) {
        fetch(`${DataUrlV1}/users/ban/${id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
        })
          .then(res => {
            if (!res.ok) {
              toast.error("کاربر بن نشد مشکلی پیش آمده!")
            } else {
              res.json()
                .then(data => {
                  getUsers()
                  toast.info("کاربر با موفقیت بن شد")
                })
            }
          })

      }
    })
  }

  const adminUser = (id) => {
    swal({
      title: "آیا از ادمین کردن این کاربر مطمعن هستید؟",
      buttons: ["خیر", "بله"]
    }).then((res) => {
      if (res) {
        const adminUser = {
          role: "ADMIN",
          id,
        }
        fetch(`${DataUrlV1}/users/role/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${LocalStorageData.token}`,
          },
          body: JSON.stringify(adminUser)
        })
          .then(res => {
            if (!res.ok) {
              toast.error("کاربر ادمین نشد مشکلی پیش آمده!")
            } else {
              res.json()
                .then(data => {
                  getUsers()
                  toast.success("کاربر با موفقیت ادمین شد")
                })
            }
          })

      }
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <Formik
        validate={registerValidate}
        initialValues={{ name: "", username: "", phone: "", email: "", password: "", confirmPassword: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.confirmPassword = values.password
          fetch(`${DataUrlV1}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(data => {
              getUsers()
              toast.success("کاربر با موفقیت اضافه شد")
              setTimeout(() => {
                resetForm()
                setSubmitting(false)
              }, 2000);
            })
        }} >
        {({ isSubmitting }) => (
          <div className='mt-5 text-sm md:text-lg'>
            <span href="#" className="mb-6  text-gray-900 dark:text-white">
              اضافه کردن کاربر جدید
            </span>
            <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
              <Input label="نام کاربر" type="text" name="name" placeholder="امیر دانش" />
              <Input label="یوزرنیم کاربر" type="text" name="username" placeholder="amirDanesh" />
              <Input label="تلفن کاربر" type="text" name="phone" placeholder="091236456789" />
              <Input label="ایمیل کاربر" type="text" name="email" placeholder="Daneshahd78@gmail.com" />
              <Input label="رمزعبور کاربر" type="text" name="password" placeholder="*********" />
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
      <Search data={users} value="name" setFilteredProducts={setFilteredProducts} placeholder={"نام کاربر مورد نظر را بنویسید ..."} />

      {
        (users.length) ? (
          <>
            <Table
              childrenTH={
                <tr>
                  <th scope="col" className="px-2 py-3">
                    نام
                  </th>
                  <th scope="col" className="px-2 py-3">
                    ایمیل
                  </th>
                  <th scope="col" className="px-2 py-3">
                    تلفن
                  </th>
                  <th scope="col" className="px-2 py-3">
                    ویرایش
                  </th>
                </tr>
              }
              childrenTD={
                currentItems.map((user) => (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.name}
                    </th>
                    <td className="px-2 py-2">
                      {user.email}
                    </td>
                    <td className="px-2 py-2">
                      {user.phone}
                    </td>
                    <td className="px-2 py-2 flex">
                      <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        setSelectUsers(user)
                        setIsShowModal(true)
                      }}>ویرایش</button>
                      <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        removeUser(user._id)
                      }}>حذف</button>
                      <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                        banUser(user._id)
                      }}>بن</button>
                      {
                        (user.role === "ADMIN") ? (
                          <>
                          </>
                        ) : (
                          <button className=" dark:text-white bg-green-700 hover:bg-green-900 text-white font-DanaMedium py-2 px-4 mx-1 rounded-lg" onClick={() => {
                            adminUser(user._id)
                          }}>ادمین کردن</button>
                        )
                      }
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
            کاربری موجود نیست از طریق فرم بالا میتوانید اولین کاربر خود را اضافه کنید.
          </div >
        )
      }

      {
        isShowModal && <Modal title="ویرایش کاربر" onHide={closeModal}
          children={
            <>
              <div className="p-6 space-y-6">
                <Formik
                  // validate={productEditValidate}
                  initialValues={{ name: `${selectUsers.name}`, email: `${selectUsers.email}`, phone: `${selectUsers.phone}`, username: `${selectUsers.username}` }}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    fetch(`${DataUrlV1}/users/${selectUsers._id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${LocalStorageData.token}`
                      },
                      body: JSON.stringify(values)
                    })
                      .then(res => {
                        res.json()
                      })
                      .then(data => {
                        getUsers()
                        toast.success("کاربر با موفقیت ویرایش شد")
                        setIsShowModal(false)
                        setTimeout(() => {
                          setSubmitting(false)
                        }, 2000);
                      })
                  }} >
                  {({ isSubmitting }) => (
                    <div className='mt-5'>
                      <Form className="space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5">
                        <Input label="نام کاربر" type="text" name="name" />
                        <Input label="ایمیل کاربر" type="text" name="email" />
                        <Input label="تلفن کاربر" type="text" name="phone" />
                        <Input label="یوزرنیم کاربر" type="text" name="username" />

                        <div className='col-start-1 col-end-3'>
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

      <Toast />
    </>

  )
}
