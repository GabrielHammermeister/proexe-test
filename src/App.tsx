import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditPage } from "./pages/EditPage/EditPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { useAppDispatch } from "./redux/hooks";
import { fetchUsers } from "./redux/slices/userSlice";
import { userStore } from "./redux/stores/userStore";

export const App = () => {
    
    const dispatch = useAppDispatch()
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
        
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/edit/:userId' element={<EditPage/>}/>
            </Routes>
            </BrowserRouter>
        </>
    )
}