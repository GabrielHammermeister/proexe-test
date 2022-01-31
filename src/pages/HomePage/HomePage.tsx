/* eslint-disable no-restricted-globals */
import { Alert, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";
import { CustomSnackbar } from "../../components/CustomSnackbar/CustomSnackbar";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeUserById, selectUsers } from "../../redux/slices/userSlice";
import { deleteUserById } from "../../services/user";


export const HomePage = () => {

    const [params, setParams] = useSearchParams()

    const [openSnackAdd, setOpenSnackAdd] = useState(params.get('redirect') === 'userAdded');
    const [openSnackEdit, setOpenSnackEdit] = useState(params.get('redirect') === 'userEdited');
    
    const users = useAppSelector(selectUsers)
    const [openConfModal, setOpenConfModal] = useState(false);
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
            setOpenConfModal(false)
        } catch (err) { console.error(err) }
    }

    const handleSelectUser = (userId: number) => {
        setOpenConfModal(true)
        setSelectedUserId(userId)
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
                            {   users && users.length > 0 
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
                    {users && users.length > 0  &&
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
            <ConfirmationModal
                openModal={openConfModal}
                setOpenModal={setOpenConfModal}
                handleOnDelete={handleOnDelete}
            />
            <CustomSnackbar
                openSnackbar={openSnackAdd}
                handleCloseSnackbar={handleCloseSnack}
                message="User added with success!"
            />
            <CustomSnackbar
                openSnackbar={openSnackEdit}
                handleCloseSnackbar={handleCloseSnack}
                message="User updated with success!"
            />
        </>
    )
}
