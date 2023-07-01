import React, { useEffect, useState } from 'react'
import { DataUrlV1 } from '../../../Data/Data'
import Pagination from '../../../Components/Pagination/Pagination'
import Table from '../../../Components/Table/Table.jsx'
export default function UserOrder() {
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))
  const [orders, setOrders] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  
  useEffect(() => {
    fetch(`${DataUrlV1}/orders`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${LocalStorageData.token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setOrders(data)
      })
  }, [])
  return (
    <div>
      <div className='p-1'>
        <div>
          {
            (orders.length) ? (
              <>
                <Table
                  childrenTH={
                    <tr>
                      <th scope="col" className="px-2 py-3">
                        شماره
                      </th>
                      <th scope="col" className="px-2 py-3">
                        تاریخ
                      </th>
                      <th scope="col" className="px-2 py-3">
                        محصولات
                      </th>
                      <th scope="col" className="px-2 py-3">
                        قیمت
                      </th>
                    </tr>
                  }
                  childrenTD={
                    currentItems.map((order , index) => (
                      <tr key={order._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-2 py-5">
                          {order.createdAt.slice(0,10)}
                        </td>
                        <td className="px-2 py-5">
                          {order.course.name}
                        </td>
                        <td className="px-2 py-5">
                          {order.price}
                        </td>
                        
                      </tr>
                    ))
                  }
                />
                <Pagination
                  data={orders}
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
        </div>
      </div>
    </div>
  )
}
