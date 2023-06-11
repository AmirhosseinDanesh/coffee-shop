import React, { useEffect, useState } from 'react'
import Header from "../../../Components/Header/Header"
import Slider from "../../../Components/Slider/Slider"
import { useParams } from 'react-router-dom'
import { DataUrlV1, DataUrl } from '../../../Data/Data'
export default function ArticlesInfo() {
    const [articleData, setArticleData] = useState({})
    const articleName = useParams()
    useEffect(() => {
        fetch(`${DataUrlV1}/articles/${articleName.articleName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setArticleData(data)
            })
    }, [])
    return (
        <>
            <Header />
            <div className='p-10'>
                <div className='text-center text-3xl md:mt-40 mt-5 px-10 text-gray-700 dark:text-white'>
                    {articleData.title}
                </div>
                <div className='mt-16 flex justify-center'>
                    <img src={`${DataUrl}/courses/covers/${articleData.cover}`} alt="" />
                </div>
                <div className='text-center text-xl mt-10 px-10 text-gray-700 dark:text-white'>
                    {articleData.description}
                </div>
                <div className='text-center text-lg mt-10 px-10 text-gray-700 dark:text-white'>
                    {articleData.body}
                </div>
            </div>
        </>
    )
}
