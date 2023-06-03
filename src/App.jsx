import React from 'react'
import Header from "./Components/Header/Header"
import { useRoutes, useLocation } from "react-router-dom"
import routes from './Routes/routes.jsx'

export default function App() {
  const router = useRoutes(routes)
  const location = useLocation()

  if (location.pathname.startsWith('/p-admin')) {
    return <>{router}</>
  }

  return (
    <>
      <Header />
      {router}
    </>
  )
}