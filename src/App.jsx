import React, { useEffect, useState } from 'react'
import { useRoutes } from "react-router-dom"
import routes from './Routes/routes.jsx'
import AuthContext from './Context/authContext.js'
import { DataUrlV1 } from "./Data/Data.js"
export default function App() {
  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const login = (userInfos, token) => {
    setToken(token)
    setUserInfos(userInfos)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify({ token }))
  }

  const logout = () => {
    setToken(null),
      setUserInfos({})
    localStorage.removeItem("user")

  }

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    if (localStorageData) {
      fetch(`${DataUrlV1}/auth/me`, {
        headers: {
          "Authorization": `Bearer ${localStorageData.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setIsLoggedIn(true)
          setUserInfos(data)
        })

    }
  }, [])



  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout,
    }}>
      {router}
    </AuthContext.Provider>
  )
}