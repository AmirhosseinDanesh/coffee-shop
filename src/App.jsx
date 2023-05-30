import React from 'react'

import Header from "./Components/Header/Header"

import { useRoutes } from "react-router-dom"
import routes from './Routes/routes.jsx'

export default function App() {
  const router = useRoutes(routes)
  return (
    <>
      <Header />
      {router}
    </>
  )
}
