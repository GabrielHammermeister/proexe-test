import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, selectUsers } from "../../redux/slices/userSlice";


// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID',type: 'number', width: 90, align: 'center', headerAlign: 'center' },
//     {
//         field: 'name',
//         headerName: 'Name',
//         width: 150,
//         editable: true,

//     },
//     {
//         field: 'username',
//         headerName: 'Username',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'city',
//         headerName: 'City',
//         width: 110,
//         editable: true,
//     },
//     {
//         field: 'email',
//         headerName: 'Email',
//         width: 250,
//         editable: true,
//     },
// ]

export const HomePage = () => {
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(selectUsers)
    
    
    useEffect(() => {console.log("meus users", users)}, [users])

    useEffect(() => {
      const getUsers = async () => {
          try {
            const res = await fetch(process.env.REACT_APP_URL!)
            const usersList = await res.json()
            dispatch(fetchUsers(usersList))            
          } catch(err) { console.error(err) }
      };
    
      getUsers()
    }, []);
    

    return (
        <>
            <div style={{minHeight: '400px', width: 'clamp(700px, 100%, 1000px)', margin: '0 auto'}}>
                {/* <DataGrid
                    columns={columns}
                    rows={users!}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onrow
                /> */}
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