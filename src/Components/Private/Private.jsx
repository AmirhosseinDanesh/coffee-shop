import React, { useContext, useEffect } from 'react'
import AuthContext from '../../Context/authContext'
import { useNavigate } from 'react-router-dom'
export default function Private({ children }) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()


    return (
        <>
            {
                auth.userInfos.role === 'ADMIN' ? <>{children}</> :  navigate('/login')
            }
        </>
    )
}
