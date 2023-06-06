import React from 'react'

export default function Table() {
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 ">
                            نام محصول
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            قیمت محصول
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            دسته بندی
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            وضعیت
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            ویرایش
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            قهوه ترک
                        </th>
                        <td className="px-6 py-4">
                            2,100,000
                        </td>
                        <td className="px-6 py-4">
                            عربیکا
                        </td>
                        <td className="px-6 py-4">
                            تمام شده
                        </td>
                        <td className="px-6 py-4">
                            <button className=" dark:text-white bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mx-1 rounded-lg ">ویرایش</button>
                            <button className=" dark:text-white bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 mx-1 rounded-lg ">حذف</button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>

    )
}
