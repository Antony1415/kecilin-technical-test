'use client'
import { Button, InputBase } from '@mui/material'
import React, { useState } from 'react'

const ProductModal = ({ formType, product }) => {
    const [formData, setFormData] = useState({
        description: product.description ?? '',
        name: product.name ?? '',
        price: product.price ?? '',
        stock: product.stock ?? '',
        category_id: product.category_id ?? '',
        user_id: 1
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
            stock: parseInt(formData.stock),
            price: parseInt(formData.price)
        }

        if (formType === 'create') {
            fetch(`http://localhost:8080/product`, {
                method: 'POST',
                body: JSON.stringify(mapFormData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        } else {
            fetch(`http://localhost:8080/product/${product.id}`, {
                method: 'PUT',
                body: JSON.stringify(mapFormData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
    }

    return (
        <form onSubmit={onSubmitForm} className='flex flex-col gap-4'>
            <h1 className='font-bold text-[30px] mb-4'>{formType === 'edit' ? 'Edit' : 'Create'} Product</h1>
            <div className='flex gap-5 items-center'>
                <label className='flex-[2]' htmlFor="">Product Name</label>
                <InputBase
                    name='name'
                    sx={{ flex: 3, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
                    placeholder="Input Product Name"
                    onChange={handleChangeForm}
                    value={formData.name}
                />
            </div>

            <div className='flex gap-5 items-center'>
                <label className='flex-[2]' htmlFor="">Product Price</label>
                <InputBase
                    name='price'
                    sx={{ flex: 3, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
                    placeholder="Input Product Price"
                    onChange={handleChangeForm}
                    value={formData.price}
                />
            </div>

            <div className='flex gap-5 items-center'>
                <label className='flex-[2]' htmlFor="">Product Stock</label>
                <InputBase
                    name='stock'
                    sx={{ flex: 3, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
                    placeholder="Input Product Stock"
                    onChange={handleChangeForm}
                    value={formData.stock}
                />
            </div>

            <div className='flex gap-5 items-center'>
                <label className='flex-[2]' htmlFor="">Product Description</label>
                <InputBase
                    name='description'
                    sx={{ flex: 3, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
                    placeholder="Input Product Description"
                    onChange={handleChangeForm}
                    value={formData.description}
                />
            </div>

            <div className='flex gap-5 items-center'>
                <label className='flex-[2]' htmlFor="">Category ID</label>
                <InputBase
                    name='category_id'
                    sx={{ flex: 3, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
                    placeholder="Input Category ID"
                    onChange={handleChangeForm}
                    value={formData.category_id}
                />
            </div>

            <div className='flex gap-5 items-center'>
                <label className='flex-[2]' htmlFor="">User ID</label>
                <InputBase
                    name='user_id'
                    sx={{ flex: 3, border: '1px solid black', px: 1.5, py: 0.5, borderRadius: 1 }}
                    placeholder="Input User ID"
                    onChange={handleChangeForm}
                    value={formData.user_id}
                />
            </div>

            <Button className='mt-5' variant="contained" type='submit'>Submit</Button>
        </form>
    )
}

export default ProductModal