import { Alert, Box, Button, Card, CardContent, CardHeader, Divider, FormHelperText, Snackbar, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { addNewUser, User } from "../../redux/slices/userSlice";
import { createUser } from "../../services/user";

interface EditFormProps {
    userData?: User
}

export const AddForm = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)

    const dispatch = useAppDispatch()

    const handleCancel = () => {
        navigate('/home')
    }

    const handleClose = () => {
        setOpen(false)
        navigate('/home')
    }

    const handleOnSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setEmailError(false)
        setNameError(false)

        if(!name) {
            setNameError(true)
        }

        if(!email) {
            setEmailError(true)
        }

        if(name && email) {

            if(!emailRegex.test(email)) {
                setEmailError(true)
                return          
            }
            try {
            
                let newUser: User = {id: 0, name, email}
            
                const res = await createUser(newUser)
                const createdUser = await res.json()                
                dispatch(addNewUser(createdUser))
            } catch(err) { console.error(err) }
            setOpen(true)

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
                        {
                            nameError ?
                            
                            (<FormHelperText error>The field can't be empty</FormHelperText>)
                            :
                            (<FormHelperText>Enter a name</FormHelperText>)
                        }

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
                        {
                            emailError ?
                            
                            (<FormHelperText error>Enter a valid email</FormHelperText>)
                            :
                            (<FormHelperText>Enter a Email</FormHelperText>)
                        }

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

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} sx={{width: '600px'}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User added with success!
                </Alert>
            </Snackbar>
        </div>
    )
}