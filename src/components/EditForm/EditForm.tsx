import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserById, User } from "../../redux/slices/userSlice";
import { updateUser } from "../../services/user";
import { regex } from "../../utils/regex";
import { CustomHelperText } from "../CustomHelperText/CustomHelperText";
import { CustomSnackbar } from "../CustomSnackbar/CustomSnackbar";

interface EditFormProps {
    userData: User
}

export const EditForm = ({ userData }: EditFormProps) => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(userData.name)
    const [nameError, setNameError] = useState(false)

    const [email, setEmail] = useState(userData.email)
    const [emailError, setEmailError] = useState(false)
    
    const [city, setCity] = useState(userData.city)
    const [username, setUsername] = useState(userData.username)

    const [openSnackEdit, setOpenSnackEdit] = useState(false);

    const handleCloseSnack = () => {
        setOpenSnackEdit(false)
        navigate('/home')
    }
    

    const handleCancel = () => {
        navigate('/home')
    }

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault()        
        setEmailError(false)
        setNameError(false)

        if(!name) {
            setNameError(true)
        }

        if(!email) {
            setEmailError(true)
        }
        if(!regex.email.test(email)) {
            setEmailError(true)
            return          
        }

        if(userData && name && email) {

            let updatedUser = {...userData}
            updatedUser.name = name
            updatedUser.email = email
            updatedUser.city = city
            updatedUser.username = username

            try {

                dispatch(updateUserById(updatedUser))
                await updateUser(updatedUser)
                setOpenSnackEdit(true)
            } catch(err) { console.error(err) }
        }
    }
    
    return (
        <div style={{minHeight: '400px', height: '100vh', width: 'clamp(700px, 100%, 1000px)', margin: '0 auto', display: 'flex', alignItems: 'center'}}>
            <Card style={{width: '100%'}} sx={{p: 5}}>
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
                            sx={{mt: 7}}
                            fullWidth
                            required 
                            label="name" 
                            value={name} 
                            onChange={(ev) => setName(ev.target.value)}
                            error={nameError} 
                        />
                        <CustomHelperText error={nameError} field="name"/>

                        <TextField 
                            sx={{mt: 7}} 
                            required 
                            fullWidth
                            label="Email" 
                            type='email'
                            value={email}  
                            onChange={(ev) => setEmail(ev.target.value)}
                            error={emailError}
                        />
                        <CustomHelperText error={emailError} field="email"/>

                        <TextField 
                            sx={{mt: 7}} 
                            fullWidth
                            label="City" 
                            value={city}  
                            onChange={(ev) => setCity(ev.target.value)}
                        />

                        <TextField 
                            sx={{mt: 7}} 
                            fullWidth
                            label="Username" 
                            value={username}  
                            onChange={(ev) => setUsername(ev.target.value)}
                        />

                        <Button 
                            variant="outlined"
                            size="large"
                            color="error"
                            sx={{mt: 7, mr: 4}}
                            onClick={handleCancel}
                        >
                            cancel</Button>
                        <Button 
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            sx={{mt: 7}} 
                        >
                            Submit</Button>
                    </Box>
                </CardContent>
            </Card> 
            
            <CustomSnackbar
                openSnackbar={openSnackEdit}
                handleCloseSnackbar={handleCloseSnack}
                message="User updated with success!"
            />
        </div>
    )
}