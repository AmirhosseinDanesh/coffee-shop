import React, { useEffect, useState } from 'react'
import Header from "../../../Components/Header/Header"
import Slider from "../../../Components/Slider/Slider"
import { useParams } from 'react-router-dom'
import { DataUrlV1, DataUrl } from '../../../Data/Data'
import DOMPurify from 'dompurify'
export default function ArticlesInfo() {
    const [articleData, setArticleData] = useState({})
    const articleName = useParams()
    console.log(articleName)
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
                    <h1>{articleData.title}</h1>
                </div>
                <div className='mt-16 flex justify-center'>
                    <img className='rounded-xl' src={`${DataUrl}/courses/covers/${articleData.cover}`} alt="" />
                </div>
                <div className='text-xl mt-10 md:px-10 text-gray-700 dark:text-white'>
                    {articleData.description}
                </div>
                <div className=' mt-10 md:px-10 text-gray-700 dark:text-white' dangerouslySetInnerHTML={{
                    __html : DOMPurify.sanitize(articleData.body)
                }}>
                </div>
            </div>
        </>
    )
}
