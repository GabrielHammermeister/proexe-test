import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserById, User } from "../../redux/slices/userSlice";

interface EditFormProps {
    userData?: User
}

export const EditForm = ({ userData }: EditFormProps) => {

    const [name, setName] = useState(userData?.name)
    const [email, setEmail] = useState(userData?.email)

    const dispatch = useAppDispatch()

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault()
        if(userData && name && email) {
            console.log(userData);
            let updatedUser = {...userData}
            updatedUser.name = name
            updatedUser.email = email
            dispatch(updateUserById(updatedUser))
            console.log(updatedUser);
            
        }
    }
    
    return (
        <Card style={{height: '400px', width: '400px', margin: '0 auto'}}>
            <CardHeader title={userData ? `Edit user ${userData.id}`: 'User not found'}/>
            <Divider/>
            <CardContent>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleOnSubmit}
                >
                    
                    <TextField 
                        sx={{m: 2}} 
                        required 
                        label="name" 
                        helperText="Enter a valid name" 
                        value={name} 
                        onChange={(ev) => setName(ev.target.value)}
                    />

                    <TextField 
                        sx={{m: 2}} 
                        required 
                        label="Email" 
                        helperText="Enter a valid email" 
                        value={email}  
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <Button type="submit" onClick={() => console.log("You clicked me")}>Submit</Button>
                </Box>
            </CardContent>
        </Card> 
    )
}