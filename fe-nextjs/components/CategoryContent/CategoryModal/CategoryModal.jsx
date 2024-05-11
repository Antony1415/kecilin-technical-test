'use client'
import { Button, InputBase } from '@mui/material'
import React, { useState } from 'react'

const CategoryModal = ({ user, formType, category }) => {
  const [formData, setFormData] = useState({
    name: category.name ?? '',
  })

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitForm = (e) => {
    if (formType === 'create') {
      fetch(`http://localhost:8080/category`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${user.email}:${user.password}`)
        }
      })
    } else {
      fetch(`http://localhost:8080/category/${category.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${user.email}:${user.password}`)
        }
      })
    }
  }

  return (
    <form onSubmit={onSubmitForm} className='flex flex-col gap-4'>
      <h1 className='font-bold text-[30px] mb-4'>{formType === 'edit' ? 'Edit' : 'Create'} Product</h1>
      <div className='flex gap-5 items-center'>
        <label className='flex-[1.5]' htmlFor="">Category Name</label>
        <InputBase
          name='name'
          sx={{ flex: 3.5, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
          placeholder="Input Category Name"
          onChange={handleChangeForm}
          value={formData.name}
        />
      </div>

      <Button className='mt-5' variant="contained" type='submit'>Submit</Button>
    </form>
  )
}

export default CategoryModal