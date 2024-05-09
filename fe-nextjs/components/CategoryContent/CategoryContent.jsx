'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@/components';

const CategoryContent = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/category', { method: 'GET' }).then(res => res.json()).then(data => {
      data.map((item) => {
        const row = {
          id: item.id,
          name: item.name,
        }
        setRows(prev => [...prev, row])
      })

    })
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'First Name', width: 130 },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-[35px]'>Category List</h1>

      <Table rows={rows} columns={columns} onEdit={(val) => { alert(`Edit ${val}`) }} onDelete={() => { alert(`Delete ${val}`) }} />
    </div>
  )
}

export default CategoryContent