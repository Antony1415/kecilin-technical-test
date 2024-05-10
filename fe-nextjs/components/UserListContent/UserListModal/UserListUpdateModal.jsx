import { Button, InputBase } from '@mui/material'
import React, { useState } from 'react'

const UserListModal = ({ user }) => {
  const [formData, setFormData] = useState({
    first_name: user.firstName,
    last_name: user.lastName,
    age: user.age,
    email: user.email,
  })

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitForm = (e) => {
    const mapFormData = {
      ...formData,
      age: parseInt(formData.age)
    }

    fetch(`http://localhost:8080/user/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(mapFormData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  return (
    <form onSubmit={onSubmitForm} className='flex flex-col gap-4'>
      <h1 className='font-bold text-[30px] mb-4'>Edit User</h1>
      <div className='flex gap-5 items-center'>
        <label className='flex-[1.5]' htmlFor="">First Name</label>
        <InputBase
          name='first_name'
          sx={{ flex: 3.5, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
          placeholder="Input First Name"
          onChange={handleChangeForm}
          value={formData.first_name}
        />
      </div>

      <div className='flex gap-5 items-center'>
        <label className='flex-[1.5]' htmlFor="">Last Name</label>
        <InputBase
          name='last_name'
          sx={{ flex: 3.5, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
          placeholder="Input Last Name"
          onChange={handleChangeForm}
          value={formData.last_name}
        />
      </div>

      <div className='flex gap-5 items-center'>
        <label className='flex-[1.5]' htmlFor="">Age</label>
        <InputBase
          name='age'
          sx={{ flex: 3.5, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
          placeholder="Input Age"
          onChange={handleChangeForm}
          value={formData.age}
        />
      </div>

      <div className='flex gap-5 items-center'>
        <label className='flex-[1.5]' htmlFor="">Email</label>
        <InputBase
          name='email'
          sx={{ flex: 3.5, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
          placeholder="Input Email"
          onChange={handleChangeForm}
          value={formData.email}
        />
      </div>

      <Button className='mt-5' variant="contained" type='submit'>Submit</Button>
    </form>
  )
}

export default UserListModal