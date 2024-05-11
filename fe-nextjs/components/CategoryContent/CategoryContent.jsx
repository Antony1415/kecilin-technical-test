'use client'
import React, { useEffect, useState } from 'react'
import { CategoryDeleteModal, CategoryModal, Table } from '@/components';
import { Box, Button, Modal } from '@mui/material';

const CategoryContent = ({ user }) => {
  const [rows, setRows] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };

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
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Category Name', width: 300 },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-[100px]'>
        <h1 className='font-bold text-[35px]'>Category List</h1>

        <Button variant="contained" type='submit' onClick={() => { setOpen(true), setFormType('create') }}>Create</Button>
      </div>

      <Table
        rows={rows}
        columns={columns}
        onRowSelect={(ids) => {
          setSelectedCategory(rows.find((product) => product.id === ids[0]))
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
          {formType === 'delete' ? <CategoryDeleteModal user={user} category={selectedCategory} /> : <CategoryModal user={user} formType={formType} category={selectedCategory} />}
        </Box>
      </Modal>
    </div>
  )
}

export default CategoryContent