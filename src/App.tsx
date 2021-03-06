import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './global.styles.css';
import { EditPage } from "./pages/EditPage/EditPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { AddPage } from "./pages/AddPage/AddPage";
import { useAppDispatch } from "./redux/hooks";
import { fetchUsers } from "./redux/slices/userSlice";
import { getUsers } from './services/user'
import { LinearProgress } from "@mui/material";
export const App = () => {
    
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const usersList = await getUsers()
                await dispatch(fetchUsers(usersList))            
                setLoading(false)
            } catch(err) { console.error(err) }
        };

        fetchUsersData()
    }, [dispatch]);
    
    return (
        <>
            {
                loading ?
                (
                    <LinearProgress/>
                )
                :
                (
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/home' element={<HomePage/>}/>
                            <Route path='/add' element={<AddPage/>}/>
                            <Route path='/edit/:userId' element={<EditPage/>}/>
                        </Routes>
                    </BrowserRouter>
                )
            }
            
        </>
    )
}