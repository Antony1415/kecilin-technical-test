'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@/components';

const CategoryContent = ({ user }) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/category', {
      method: 'GET', headers: {
        'Authorization': 'Basic ' + btoa(`${user.email}:${user.password}`)
      }
    }).then(res => res.json()).then(data => {
      const mapData = []
      data.map((item) => {
        const row = {
          id: item.id,
          name: item.name,
        }
        mapData.push(row)
      })
      setRows(mapData)
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