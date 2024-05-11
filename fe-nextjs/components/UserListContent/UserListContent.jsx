'use client'
import React, { useEffect, useState } from 'react'
import { Table, UserListDeleteModal, UserListUpdateModal } from '@/components';
import { Box, Modal } from '@mui/material';

const UserListContent = ({ user }) => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [selectedUser, setSelectedUser] = useState([]);
  const handleClose = () => {
    setOpen(false)
    setFormType('')
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    py: 4,
    px: 6
  };

  useEffect(() => {
    fetch('http://localhost:8080/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${user.email}:${user.password}`)
      }
    }).then(res => res.json()).then(data => {
      const mapData = []
      data.map((item) => {
        const row = {
          id: item.id,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          age: item.age,
          role: item.role
        }
        mapData.push(row)
      })
      setRows(mapData)
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

      <Table
        rows={rows}
        columns={columns}
        onRowSelect={(ids) => {
          setSelectedUser(rows.find((user) => user.id === ids[0]))
        }}
        onEdit={() => {
          setOpen(true)
          setFormType('edit')
        }}
        onDelete={() => {
          setOpen(true)
          setFormType('delete')
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {formType === 'edit' ? <UserListUpdateModal user={selectedUser} /> : <UserListDeleteModal user={selectedUser} />}
        </Box>
      </Modal>
    </div>
  )
}

export default UserListContent