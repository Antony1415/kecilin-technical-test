import { Button } from '@mui/material'
import React from 'react'

const UserListDeleteModal = ({ user }) => {
  const onSubmitForm = (e) => {
    fetch(`http://localhost:8080/user/${user.id}`, { method: 'DELETE' })
  }

  return (
    <form onSubmit={onSubmitForm} className='flex flex-col gap-4'>
      <h1 className='text-[30px] text-center'>Are you sure want to delete this User ({user.email}) ?</h1>
      <Button className='mt-5' variant="contained" type='submit'>Submit</Button>
    </form>
  )
}

export default UserListDeleteModal