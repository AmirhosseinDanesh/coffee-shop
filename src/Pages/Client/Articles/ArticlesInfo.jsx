import React, { useEffect, useState } from 'react'
import Header from "../../../Components/Header/Header"
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { DataUrlV1, DataUrl } from '../../../Data/Data'
import DOMPurify from 'dompurify'
export default function ArticlesInfo() {
    const [articleData, setArticleData] = useState({})
    const [articleCategoty, setArticleCategoty] = useState("")
    const [articleLink, setArticleLink] = useState("")
    const articleName = useParams()
    useEffect(() => {
        fetch(`${DataUrlV1}/articles/${articleName.articleName}`)
            .then(res => res.json())
            .then(data => {
                setArticleData(data)
                setArticleCategoty(data.categoryID.title)
                setArticleLink(data.categoryID.name)
            })
    }, [])
    return (
        <>
            <Header />
            <div className='container'>
                <div className='text-center text-3xl md:mt-40 mt-5 md:px-10 text-gray-700 dark:text-white'>
                    <h1>{articleData.title}</h1>

                </div>
                <h3 className='flex mt-6 justify-center gap-x-2 text-gray-600 dark:text-gray-400 font-DanaBold '>
                    <NavLink className="underline hover:text-gray-900 hover:dark:text-white " to="/">خانه</NavLink>
                    <span className=''>/</span>
                    <NavLink className="underline hover:text-gray-900 hover:dark:text-white " to="/articles">مقالات</NavLink>
                </h3>
                <div className='mt-16 flex justify-center'>
                    <img className='rounded-xl' src={`${DataUrl}/courses/covers/${articleData.cover}`} alt="" />
                </div>
                <div className='text-lg mt-10 md:px-10 text-gray-700 dark:text-white tracking-tight	'>
                    {articleData.description}
                </div>
                <div className=' mt-10 md:px-10 text-gray-700 dark:text-white' dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(articleData.body)
                }}>
                </div>
            </div>
        </>
    )
}
