import React, { useState, useEffect } from 'react'

import Table from '../../../Components/Table/Table.jsx'

import { DataUrlV1 } from "../../../Data/Data"


export default function Users() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [users, setUsers] = useState([])


  const getUsers = () => {
    fetch(`${DataUrlV1}/users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${LocalStorageData.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      {
        (users.length) ? (
          <Table
            childrenTH={
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  نام
                </th>
                <th scope="col" className="px-6 py-3 ">
                  ایمیل
                </th>
                <th scope="col" className="px-6 py-3 ">
                  تلفن
                </th>
                <th scope="col" className="px-6 py-3 ">
                  ویرایش
                </th>
              </tr>
            }
            childrenTD={
              users.map((user) => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                  </th>
                  <td className="px-2 py-2">
                    {user.email}
                  </td>
                  <td className="px-2 py-2">
                    {user.phone}
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
        ) : (
          <div className='bg-red-700 p-3 rounded-xl text-center text-white'>
            کاربری موجود نیست از طریق فرم بالا میتوانید اولین کاربر خود را اضافه کنید.
          </div >
        )
      }
    </>

  )
}
