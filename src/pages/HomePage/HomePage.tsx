import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeUserById, selectUsers } from "../../redux/slices/userSlice";
import { deleteUserById } from "../../services/user";

export const HomePage = () => {
    const users = useAppSelector(selectUsers)
    const dispatch = useAppDispatch()

    const hanldeOnDelete = async (userId: number) => {
        try {
            deleteUserById(userId)
            dispatch(removeUserById(userId))

        } catch (err) { console.error(err) }
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
                            {users?.map((user) => (
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
                                        onClick={() => hanldeOnDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button 
                        sx={{m: 5}}
                        size="large"
                        variant="contained" 
                        color="primary" 
                        >
                        Add New
                    </Button>
                </TableContainer>               
            </div>

        </>
    )
}