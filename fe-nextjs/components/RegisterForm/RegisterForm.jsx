'use client'
import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'

const RegisterForm = ({ setFormType }) => {
  const router = useRouter();
  const[formData, setFormData] = useState({
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
    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        const userData = {
          id: data.id,
          role: data.role,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          email: data.email
        }
        document.cookie = `user=${JSON.stringify(userData)}`
        router.push("/home")
      })
      .catch()
  }

  return (
    <form onSubmit={onSubmitForm} className='flex flex-col gap-5'>
      <h1 className='text-[35px] text-center font-bold mb-5'>Register</h1>

      <TextField type='first_name' name='first_name' label="First Name" variant="outlined" onChange={handleChangeForm} />
      <TextField type='last_name' name='last_name' label="Last Name" variant="outlined" onChange={handleChangeForm} />
      <TextField type='age' name='age' label="Age" variant="outlined" onChange={handleChangeForm} />
      <TextField name='email' label="Email" variant="outlined" onChange={handleChangeForm} />
      <TextField type='password' name='password' label="Password" variant="outlined" onChange={handleChangeForm} />

      <div className='flex justify-between text-[14px]'>
        <p className='text-gray-500/80'>Already have an account?</p>
        <p className='text-blue-600 cursor-pointer' onClick={() => setFormType('login')}>LOGIN HERE!</p>
      </div>
      <Button variant="contained" type='submit'>Submit</Button>
    </form>
  )
}

export default RegisterForm