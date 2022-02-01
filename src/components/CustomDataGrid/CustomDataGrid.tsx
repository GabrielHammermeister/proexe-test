import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../redux/slices/userSlice";
import { EmptyState } from "../EmptyState/EmptyState";


interface CustomDataGridProps {
    handleSelectUser: (id: number) => void
    handleSelectionChange: (selectionModel: GridSelectionModel) => void
    users: User[]
}

export const CustomDataGrid = ({handleSelectUser, handleSelectionChange, users}: CustomDataGridProps) => {

    const columns: GridColDef[] = [
        {   field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 220,
            editable: true,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 160,
        },
        {
            field: 'action1',
            headerName: 'Edit',
            renderCell: (params: GridValueGetterParams) => (
            <Link to={`/edit/${params.row.id}`} style={{textDecoration: 'none'}}>
                <Button variant="contained" color="warning">Edit</Button>
            </Link>)
        },
        {
            field: 'action2',
            headerName: 'Delete',
            renderCell: (params: GridValueGetterParams) => (
                <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleSelectUser(params.row.id)}>
                    Delete
                </Button>)
        }
    ];
    
    return (
        <DataGrid
            sx={{width: '100%', maxHeight: '700px', marginTop: '200px'}}
            rows={users}
            columns={columns}
            components={{
                NoRowsOverlay: EmptyState
            }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={handleSelectionChange}
        />
    )
}