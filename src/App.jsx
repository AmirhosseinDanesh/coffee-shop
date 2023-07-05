import React, { useCallback, useEffect, useState } from 'react'
import { useRoutes } from "react-router-dom"
import routes from './Routes/routes.jsx'
import AuthContext from './Context/authContext.js'
import { DataUrlV1 } from "./Data/Data.js"

import productsContext from './Context/ProductsContext.js'

export default function App() {

  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const [userCart, setUserCart] = useState([])

  const login = (userInfos, token) => {
    setToken(token)
    setUserInfos(userInfos)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify({ token }))
  }

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setToken(null)
    setUserInfos({})
    localStorage.removeItem("user")

  })

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
    } else {
      setIsLoggedIn(false)
    }
  }, [isLoggedIn])



  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout,
    }}>
      <productsContext.Provider value={{
        userCart,
        setUserCart,
      }}>

        {router}
      </productsContext.Provider>
    </AuthContext.Provider>
  )
}