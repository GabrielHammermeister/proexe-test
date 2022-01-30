import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, selectUsers } from "../../redux/slices/userSlice";

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
            <h1>Home Page!</h1>
            <Link to='/edit' >Edit page</Link>
            {users?.map((value, index) => (
                <h1 key={index}>{value.name}</h1>
            ))}
        </>
    )
}