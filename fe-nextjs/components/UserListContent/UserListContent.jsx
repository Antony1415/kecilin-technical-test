'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Table } from '@/components';

const UserListContent = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/user', { method: 'GET' }).then(res => res.json()).then(data => {
      data.map((item) => {
        const row = {
          id: item.id,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          age: item.age,
          role: item.role
        }
        setRows(prev => [...prev, row])
      })

    })
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'email', width: 170 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'age', headerName: 'Age', type: 'number', width: 50, },
    { field: 'role', headerName: 'Role', width: 70, },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-[35px]'>User List</h1>

      <Table rows={rows} columns={columns} onEdit={(val) => { alert(`Edit ${val}`) }} onDelete={() => { alert(`Delete ${val}`) }} />
    </div>
  )
}

export default UserListContent