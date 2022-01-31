import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './EmptyState.styles.css'

export const EmptyState = () => {
    return (
        <>
            <div className='container'>
                <img src='emptystate.png' alt="illustration of an empty folder" className='img-empty-state' />
                <Typography variant="h4">No users found</Typography>
                <Typography variant="h5">Add new users and track all data here.</Typography>
                <Link to={`/add`} style={{textDecoration: 'none'}}>
                    <Button 
                        sx={{m: 5}}
                        size="large"
                        variant="contained" 
                        color="primary" 
                        >
                        Add New User
                    </Button>
                </Link>
            </div>
        </>
    )
}