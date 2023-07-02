import React, { useState } from 'react'

import { useContext, useEffect } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { NavLink } from 'react-router-dom'

import AuthContext from "../../../Context/authContext"
import { DataUrlV1 } from '../../../Data/Data'
import { toast } from 'react-toastify'
import Toast from '../../../Components/Toast/Toast'


export default function UserDetails() {
  const auth = useContext(AuthContext)
  const [name, setName] = useState(auth.userInfos.name)
  const [email, setEmail] = useState(auth.userInfos.email)
  const [phone, setPhone] = useState(auth.userInfos.phone)
  const [username, setUsername] = useState(auth.userInfos.username)
  const [password, setPassword] = useState("")
  const LocalStorageData = JSON.parse(localStorage.getItem("user"))


  const editAcc = (event) => {

    event.preventDefault()
    const newInfo = {
      name,
      phone,
      email,
      username,
      password
    }
    fetch(`${DataUrlV1}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${LocalStorageData.token}`
      },
      body: JSON.stringify(newInfo)
    })
      .then(res => {
        if (!res.ok) {
          toast.error("حساب کاربری ویرایش نشد!")
        } else {
          res.json()
            .then(data => {
              toast.success("حساب کاربری با موفقیت ویرایش شد:)")
              setPassword("")
            })
        }
      })

  }


  useEffect(() => {

  })
  return (
    <div className='p-1'>
      <form className='space-y-1 md:space-y-1 grid gap-2 mb-6 md:grid-cols-2 mt-5'>
        <div>
          <label className="input-label">نام و نام خانوادگی</label>
          <input type="text" name='name' className='input' value={name} onChange={(event) => {
            setName(event.target.value)
          }} />
        </div>
        <div>
          <label className="input-label">ایمیل</label>
          <input type="email" name='name' className='input' value={email} onChange={(event) => {
            setEmail(event.target.value)
          }} />
        </div>
        <div>
          <label className="input-label">تلفن همراه</label>
          <input type="text" name='name' className='input' value={phone} onChange={(event) => {
            setPhone(event.target.value)
          }} />
        </div>
        <div>
          <label className="input-label">یوزر نیم</label>
          <input type="text" name='name' className='input' value={username} onChange={(event) => {
            setUsername(event.target.value)
          }} />
        </div>
        <div>
          <label className="input-label">رمز عبور جدید</label>
          <input type="password" name='name' className='input' placeholder='*******' value={password} onChange={(event) => {
            setPassword(event.target.value)
          }} required="" />
        </div>
        <div className='col-start-1 md:col-end-3' >
          <button className='input-submit bg-blue-600 mt-3' type="submit" onClick={() => {
            editAcc(event)
          }}>ویرایش اطلاعات</button>
        </div>
      </form>
      <Toast />
    </div>
  )
}
