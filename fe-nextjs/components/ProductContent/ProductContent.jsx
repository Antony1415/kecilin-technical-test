'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@/components';

const ProductContent = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/product', { method: 'GET' }).then(res => res.json()).then(data => {
      data.map((item) => {
        const row = {
          id: item.id,
          description: item.description,
          name: item.name,
          price: item.price,
          stock: item.stock,
          category: item.category.name
        }
        setRows(prev => [...prev, row])
      })

    })
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'stock', headerName: 'Stock', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-[35px]'>Product List</h1>

      <Table rows={rows} columns={columns} onEdit={(val) => { alert(`Edit ${val}`) }} onDelete={() => { alert(`Delete ${val}`) }} />
    </div>
  )
}

export default ProductContent