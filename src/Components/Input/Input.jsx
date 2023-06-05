import React from 'react'
import { Field , ErrorMessage } from 'formik'
export default function Input({ label , type , name , placeholder}) {
    return (
        <div>
            <label className="input-label">{label}</label>
            <Field type={type} name={name} className="input" placeholder={placeholder} required="" />
            <ErrorMessage name={name}>
                {(msg) => <span className='text-xs text-red-600'>{msg}</span>}
            </ErrorMessage>
        </div>
    )
}
