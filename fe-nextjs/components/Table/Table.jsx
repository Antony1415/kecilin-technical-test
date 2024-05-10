''
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns, onRowSelect, onEdit, onDelete, hideFooter = false, customPaginate = false }) => {
    const actionsColumn = () => {
        return (
            <div className='flex gap-5 items-center justify-center w-full h-full'>
                <img className='cursor-pointer' onClick={onEdit} src='/pencil.png' width={30} height={30} />
                <img className='cursor-pointer' onClick={onDelete} src='/remove.png' width={30} height={30} />
            </div>
        )
    }

    const mapColumn = [
        ...columns,
        { field: 'action', headerName: '', width: 90, renderCell: () => actionsColumn() },
    ]

    return (
        <div style={{ height: 'fit-content', width: 'fit-content' }}>
            {customPaginate ? (
                <DataGrid
                    rows={rows}
                    columns={mapColumn}
                    checkboxSelection
                    onRowSelectionModelChange={onRowSelect}
                    disableRowSelectionOnClick
                    hideFooter={hideFooter}
                />
            )
                : (
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
                        onRowSelectionModelChange={onRowSelect}
                        disableRowSelectionOnClick
                        hideFooter={hideFooter}
                    />
                )}
        </div>
    )
}

export default Table