import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'

export default function AdminPanel() {
  return (
    <>
      <div>AdminPanel</div>
      <Outlet />

    </>
  )
}
