import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface ConfirmationModalProps {
    openSnackbar: boolean
    handleCloseSnackbar: () => void
    message: string
}

export const CustomSnackbar = ({openSnackbar, handleCloseSnackbar, message}: ConfirmationModalProps) => {
    return (
        <Snackbar 
            open={openSnackbar} 
            onClose={handleCloseSnackbar}  
            sx={{width: '600px'}}
            autoHideDuration={3000} 
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                { message }
            </Alert>
        </Snackbar>
    )
}