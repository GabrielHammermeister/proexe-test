import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, selectUsers } from "../../redux/slices/userSlice";

export const HomePage = () => {
    const users = useAppSelector(selectUsers)

    return (
        <>
            <div style={{minHeight: '400px', width: 'clamp(700px, 100%, 1000px)', margin: '0 auto'}}>
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
                                        <Button variant="contained" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>               
            </div>

        </>
    )
}