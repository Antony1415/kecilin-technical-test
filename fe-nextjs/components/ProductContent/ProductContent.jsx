'use client'
import React, { useEffect, useState } from 'react'
import { ProductDeleteModal, Table, ProductModal } from '@/components';
import { Box, Button, MenuItem, Modal, Pagination, Select, TextField } from '@mui/material';

const ProductContent = () => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [sortBy, setSortBy] = useState('');
  const [searchByName, setSearchByName] = useState('');
  const [categoryDropdown, setCategoryDropdown] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState('');
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };

  useEffect(() => {
    fetch(`http://localhost:8080/category`, { method: 'GET' }).then(res => res.json()).then(data => {
      const mapData = []
      data.map((item) => {
        mapData.push(item.name)
      })
      setCategoryDropdown(mapData)
    })
  }, [])

  useEffect(() => {
    const reqParams = `?page=${pageNumber}` +
      `${pageSize && `&size=${pageSize}`}` +
      `${filterByCategory && `&category=${filterByCategory}`}` +
      `${sortBy && `&sort=${sortBy}`}` +
      `${searchByName && `&name=${searchByName}`}`
    console.log("REQ: ", reqParams);

    fetch(`http://localhost:8080/product${reqParams}`, { method: 'GET' }).then(res => res.json()).then(data => {
      const mapData = []
      console.log("AKAKA", data);
      data.content.map((item) => {
        const row = {
          id: item.id,
          description: item.description,
          name: item.name,
          price: item.price,
          stock: item.stock,
          category: item.category.name,
          category_id: item.category.id
        }
        mapData.push(row)
      })
      setRows(mapData)
    })
  }, [pageNumber, filterByCategory, searchByName, sortBy])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'stock', headerName: 'Stock', width: 130 },
    { field: 'description', headerName: 'Description', width: 230 },
  ];


  const handleSearch = (e) => {
    setSearchByName(e.target.value)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-[100px]'>
        <h1 className='font-bold text-[35px]'>Product List</h1>

        <div className='flex gap-[50px]'>
          <TextField name='search' placeholder="Search By Name" variant="outlined" onChange={handleSearch} />

          <Select
            value={filterByCategory}
            onChange={(event) => setFilterByCategory(event.target.value)}
            defaultValue={""}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Filter By</em>
            </MenuItem>
            {categoryDropdown.map((category) => {
              return (
                <MenuItem value={category}>{category}</MenuItem>
              )
            })}
          </Select>

          <Select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            defaultValue={""}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Sort By</em>
            </MenuItem>
            <MenuItem value={"asc"}>A - Z</MenuItem>
            <MenuItem value={"desc"}>Z - A</MenuItem>
          </Select>

          <Button variant="contained" type='submit' onClick={() => { setOpen(true), setFormType('create') }}>Create</Button>
        </div>
      </div>

      <Table
        rows={rows}
        columns={columns}
        onRowSelect={(ids) => {
          setSelectedProduct(rows.find((product) => product.id === ids[0]))
        }}
        onEdit={() => {
          setOpen(true)
          setFormType('edit')
        }}
        onDelete={() => {
          setOpen(true)
          setFormType('delete')
        }}
        hideFooter={true}
      />
      <Pagination
        count={(rows.length / pageSize) % pageSize === 0 ? (rows.length / pageSize) : Math.floor(rows.length / pageSize) + 1}
        color="primary"
        onChange={(event, value) => {
          setPageNumber(value - 1)
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {formType === 'delete' ? <ProductDeleteModal product={selectedProduct} /> : <ProductModal formType={formType} product={selectedProduct} />}
        </Box>
      </Modal>
    </div>
  )
}

export default ProductContent