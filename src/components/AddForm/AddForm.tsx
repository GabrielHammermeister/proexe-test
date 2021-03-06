import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { addNewUser, User } from "../../redux/slices/userSlice";
import { createUser } from "../../services/user";
import { regex } from "../../utils/regex";
import { CustomHelperText } from "../CustomHelperText/CustomHelperText";
import { CustomSnackbar } from "../CustomSnackbar/CustomSnackbar";


export const AddForm = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)

    const [city, setCity] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useAppDispatch()
    
    const [openSnackAdd, setOpenSnackAdd] = useState(false);

    const handleCloseSnack = () => {
        setOpenSnackAdd(false)
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

        if(name && email) {

            if(!regex.email.test(email)) {
                setEmailError(true)
                return          
            }
            try {
                let newUser: User = {id: 0, name, email, username, city}
    
                const res = await createUser(newUser)
                const createdUser = await res.json()                
                dispatch(addNewUser(createdUser))
                await setOpenSnackAdd(true)
            } catch(err) { console.error(err) }

            
        }
    }
    
    return (
        <div style={{minHeight: '400px', height: '100vh', width: 'clamp(700px, 100%, 1000px)', margin: '0 auto', display: 'flex', alignItems: 'center'}}>
            <Card style={{width: '100%'}} sx={{p: 5}}>
                <CardHeader title={'Add a new User'}/>
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
                            Save</Button>
                    </Box>
                </CardContent>
            </Card> 

            
            <CustomSnackbar
                openSnackbar={openSnackAdd}
                handleCloseSnackbar={handleCloseSnack}
                message="User added with success!"
            />
        </div>
    )
}