'use client'
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const LoginForm = ({ setFormType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("AKAKA", formData);
  }

  return (
    <form onSubmit={onSubmitForm} className='flex flex-col gap-5'>
      <h1 className='text-[35px] text-center font-bold mb-5'>Login</h1>

      <TextField name='email' label="Email" variant="outlined" onChange={handleChangeForm} />
      <TextField type='password' name='password' label="Password" variant="outlined" onChange={handleChangeForm} />

      <div className='flex justify-between text-[14px]'>
        <p className='text-gray-500/80'>Don't have any account?</p>
        <p className='text-blue-600 cursor-pointer' onClick={() => setFormType('register')}>REGISTER HERE!</p>
      </div>
      <Button variant="contained" type='submit'>Submit</Button>
    </form>
  )
}

export default LoginForm