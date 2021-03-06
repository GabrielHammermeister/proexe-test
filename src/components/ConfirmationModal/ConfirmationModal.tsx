import { Button, Card, CardContent, CardHeader, Modal, Typography } from '@mui/material';
import React from 'react';

interface ConfirmationModalProps {
    openModal: boolean
    setOpenModal: (value: boolean) => void
    handleOnDelete: () => void
    message: string
}

export const ConfirmationModal = ({openModal, setOpenModal, handleOnDelete, message }: ConfirmationModalProps) => {
    return (
        <Modal open={openModal}>
            <Card sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                p: 4,
            }}>
                <CardHeader title="Are you sure?"/>
                <CardContent>
                    <Typography>{message}</Typography>
                </CardContent>

                <Button 
                    sx={{m: 3}}
                    variant="contained" 
                    size="large"
                    color="primary" 
                    onClick={() => setOpenModal(false)}>
                    Cancel
                </Button>
                <Button 
                    sx={{m: 3}}
                    variant="outlined"
                    size="large"
                    color="error" 
                    onClick={() => handleOnDelete()}>
                    Delete
                </Button>
            </Card>
        </Modal>   
    )
}