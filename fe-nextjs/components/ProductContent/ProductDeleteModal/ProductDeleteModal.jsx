import { Button } from '@mui/material'
import React from 'react'

const ProductDeleteModal = ({ user, product }) => {
    const onSubmitForm = (e) => {
        fetch(`http://localhost:8080/product/${product.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.email}:${user.password}`)
            }
        })
    }

    return (
        <form onSubmit={onSubmitForm} className='flex flex-col gap-4'>
            <h1 className='text-[30px] text-center'>Are you sure want to delete this Product ({product.name}) ?</h1>
            <Button className='mt-5' variant="contained" type='submit'>Submit</Button>
        </form>
    )
}

export default ProductDeleteModal