import React from 'react'
import Header from '../../../Components/Header/Header'
import ReactLoading from 'react-loading';
export default function AboutUs() {
    return (
        <>
            <Header />
            <div className='flex w-full justify-center items-center text-center backdrop-blur-sm mt-56'>
                <ReactLoading type={"bubbles"} color={"white"} height={250} width={250} />
            </div>
        </>
    )
}

