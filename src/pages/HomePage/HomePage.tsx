/* eslint-disable no-restricted-globals */
import { Alert, Button, Card, CardContent, CardHeader, Modal, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeUserById, selectUsers } from "../../redux/slices/userSlice";
import { deleteUserById } from "../../services/user";

interface NavigateState {
    state: {
        userAdded?: boolean,
        userEdited?: boolean
    }
}

export const HomePage = () => {
    const location = useLocation()    
    const { state } = location as NavigateState
    
    const users = useAppSelector(selectUsers)
    const [open, setOpen] = useState(false);
    const [openSnackAdd, setOpenSnackAdd] = useState(false);
    const [openSnackEdit, setOpenSnackEdit] = useState(false);
    const dispatch = useAppDispatch()
    const [selectedUserId, setSelectedUserId] = useState(0);

    const handleCloseSnack = () => {
        setOpenSnackAdd(false)
        setOpenSnackEdit(false)
        history.replaceState({}, '')
    }

    const handleOnDelete = async () => {
        try {
            deleteUserById(selectedUserId)
            dispatch(removeUserById(selectedUserId))
            setOpen(false)
        } catch (err) { console.error(err) }
    }

    const handleSelectUser = (userId: number) => {
        setOpen(true)
        setSelectedUserId(userId)
    }

    if(users?.length === 0) {
        return <EmptyState/>
    }

    return (
        <>
            <div style={{minHeight: '400px', height: '100vh', width: 'clamp(700px, 100%, 1000px)', margin: '0 auto', display: 'flex', alignItems: 'center'}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{backgroundColor: '#00a5df', color: '#FFFFFF'}}>
                            <TableRow >
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {   users && users.length === 0 
                                ?
                                (
                                    users?.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.city}</TableCell>
                                            <TableCell>
                                                <Link to={`/edit/${user.id}`} style={{textDecoration: 'none'}}>
                                                    <Button variant="contained" color="warning">Edit</Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button 
                                                variant="contained" 
                                                color="error" 
                                                onClick={() => handleSelectUser(user.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        ))
                                )
                                :
                                (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <EmptyState/>
                                        </TableCell>
                                    </TableRow>
                                )

                            }
                        </TableBody>
                    </Table>
                    {users && users.length === 0  &&
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
                    }
                </TableContainer>
           
            </div>
            <Modal
                open={open}
            >
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
                        <Typography>If you click Delete, all information about this user will be lost.</Typography>
                    </CardContent>

                    <Button 
                        sx={{m: 3}}
                        variant="contained" 
                        size="large"
                        color="primary" 
                        onClick={() => setOpen(false)}>
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
            <Snackbar open={openSnackAdd} onClose={handleCloseSnack} autoHideDuration={3000} sx={{width: '600px'}}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    User added with success!
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackEdit} onClose={handleCloseSnack} autoHideDuration={3000} sx={{width: '600px'}}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    User updated with success!
                </Alert>
            </Snackbar>
        </>
    )
}
