import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns, onEdit, onDelete }) => {
    const [selectedRow, setSelectedRow] = useState([]);
    const actionsColumn = () => {
        return (
            <div className='flex gap-5 items-center justify-center w-full h-full'>
                <img className='cursor-pointer' onClick={() => onEdit(selectedRow)} src='/pencil.png' width={30} height={30} />
                <img className='cursor-pointer' onClick={() => onDelete(selectedRow)} src='/remove.png' width={30} height={30} />
            </div>
        )
    }

    const mapColumn = [
        ...columns,
        { field: 'action', headerName: '', width: 90, renderCell: () => actionsColumn() },
    ]

    return (
        <div style={{ height: 'fit-content', width: 'fit-content' }}>
            <DataGrid
                rows={rows}
                columns={mapColumn}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(ids) => setSelectedRow(ids)}
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default Table