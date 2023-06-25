import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
export default function Pagination({ data, items, setItems }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        getSetItem(currentItems)
    };

    const getSetItem = () => {
        setItems(currentItems)

    }
    useEffect(() => {
        getSetItem();
    }, [itemOffset, data]);
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-700 px-4 py-3 sm:px-6 text-sm ">
            <div>
                <p className="text-sm  text-gray-300 flex gap-x-2">
                    <p>لیست</p>
                    <span className="font-DanaMedium">{itemOffset + 1}</span>
                    <p>تا</p>
                    <span className="font-DanaMedium">{endOffset}</span>

                    {(data.length) ? (
                        <>
                            <p>مجموع کل</p>
                            <span className='font-DanaBold'>{data.length}</span>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </p>
            </div>
            <div>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    nextLabel={<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>}
                    previousLabel={<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>}
                    containerClassName='inline-flex items-center -space-x-px'
                    previousLinkClassName='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    nextLinkClassName='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    pageLinkClassName='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    activeLinkClassName='z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    disabledLinkClassName='hover:!text-gray-500 hover:bg-white hover:dark:!bg-gray-800 hover:dark:!text-gray-400 '
                />
            </div>
        </div>
    )
}
