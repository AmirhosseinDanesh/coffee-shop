import React, { useContext } from 'react'
import Headers from "../../../Components/Header/Header"
import { DataUrl } from '../../../Data/Data'
import ProductsContext from '../../../Context/ProductsContext'
import { Input } from 'postcss'
export default function Cart() {
    const contextData = useContext(ProductsContext)

    const calculateTotalPrice = () => {
        return contextData.userCart.reduce((total, product) => {
            return total + (((product.price - ((product.discount * product.price) / 100)) * product.count));
        }, 0);
    }

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
            discount: pro.discount

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

    const removeProducts = (pro) => {
        const updatedCart = contextData.userCart.map(product => {
            if (product.id === pro.id) {
                if (product.count > 1) {
                    product.count -= 1;
                    return product;
                } else {
                    return null;
                }
            }
            return product;
        }).filter(item => item !== null);

        contextData.setUserCart(updatedCart);

        // ذخیره سبد خرید در localStorage
        localStorage.setItem('userCart', JSON.stringify(updatedCart));

        // بررسی و حذف محصول از localStorage اگر موجودیش صفر شده است
        if (product.count === 1) {
            const storedCart = localStorage.getItem('userCart');
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                const updatedStoredCart = parsedCart.filter(item => item.id !== pro.id);
                localStorage.setItem('userCart', JSON.stringify(updatedStoredCart));
            }
        }
    }

    const removeProductFromCart = (product) => {
        const updatedCart = contextData.userCart.filter(p => p.id !== product.id);
        contextData.setUserCart(updatedCart)
        localStorage.setItem('userCart', JSON.stringify(updatedCart));

    }





    return (
        <>
            <Headers />
            <div className='container'>
                <div className='mt-10 md:mt-48 dark:text-white font-MorabbaBold text-2xl md:text-5xl text-center md:text-right'>
                    سبد خرید
                </div>
            </div>
            <div className="h-screen pt-20">
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 gap-x-10">
                    <div className="rounded-lg md:w-[55%]">
                        {
                            contextData.userCart.length ? (
                                contextData.userCart.map(product => (
                                    <div className="justify-between items-center mb-6 rounded-lg bg-white dark:bg-gray-700 p-6 shadow-md sm:flex sm:justify-start">
                                        <img src={`${DataUrl}/courses/covers/${product.cover}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                            <div className="mt-5 sm:mt-0">
                                                <h2 className="text-lg font-bold text-gray-900 dark:text-white ">{product.name}</h2>
                                                <p className="mt-3 text-base text-gray-700 dark:text-white flex justify-between items-start">
                                                    <span className='text-xs md:text-base'>فی</span>
                                                    <div>
                                                        {
                                                            (product.discount !== 0) ? (
                                                                <>
                                                                    <div className='text-teal-600 dark:text-emerald-500'>
                                                                        <span className='font-DanaMedium text-sm md:text-xl'>{(product.price - ((product.discount * product.price) / 100)).toLocaleString()}</span>
                                                                        <span className='text-xs tracking-tighter mr-0.5'>تومان</span>
                                                                    </div>
                                                                    <div className='offer text-gray-400/80 flex justify-center items-center'>
                                                                        <span className='text-xs md:text-lg'>{product.price.toLocaleString()}</span>
                                                                        <span className='hidden xl:inline text-sm tracking-tighter mr-0.5'>تومان</span>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                (product.price)
                                                            )
                                                        }
                                                    </div>
                                                </p>
                                            </div>
                                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                <div className="flex items-center border-gray-100">
                                                    <span className="cursor-pointer rounded-r bg-gray-300 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => addToCart(product)}> + </span>
                                                    <span className="w-8 h-8 flex justify-center items-center  bg-gray-300 text-center text-xs outline-none">{product.count}</span>
                                                    <span className="cursor-pointer rounded-l bg-gray-300 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => removeProducts(product)}> - </span>
                                                </div>
                                                <div className="flex items-center justify-between w-[30%] md:w-full dark:text-white">
                                                    <p className="text-sm">{((product.price - ((product.discount * product.price) / 100)) * product.count).toLocaleString()}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 md:h-5 w-4 md:w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => removeProductFromCart(product)}>
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-md dark:text-white text-center ">
                                    محصولی در سبد خرید نیست.
                                </div>
                            )
                        }
                    </div>
                    <div className="mt-6 h-full rounded-lg border dark:border-none bg-white dark:bg-gray-700 p-6 shadow-md md:mt-0 md:w-[45%]">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 '>
                            <div className='md:col-start-1 md:col-end-3'>
                                <label className='input-label'>نام و نام خانوادگی</label>
                                <input type="text" className='input' />
                            </div>
                            <div>
                                <label className='input-label'>استان</label>
                                <input type="text" className='input' />
                            </div>
                            <div>
                                <label className='input-label'>شهر</label>
                                <input type="text" className='input' />
                            </div>
                            <div className='md:col-start-1 md:col-end-3'>
                                <label className='input-label'>آدرس</label>
                                <input type="text" className='input' />
                            </div>
                            <div className='md:col-start-1 md:col-end-3'>
                                <label className='input-label'>کدپستی</label>
                                <input type="text" className='input' />
                            </div>
                        </div>
                        <div className="flex justify-between mt-3 md:mt-10">
                            <p className="text-lg font-bold dark:text-white">مجموع</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold dark:text-white">{calculateTotalPrice().toLocaleString()}<span className='text-xs mr-1'>تومان</span></p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">پرداخت</button>
                    </div>
                </div>
            </div>
        </>
    )
}
