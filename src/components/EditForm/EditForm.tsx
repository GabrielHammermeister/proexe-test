import { Alert, Box, Button, Card, CardContent, CardHeader, Collapse, Divider, FormHelperText, IconButton, Snackbar, TextField } from "@mui/material";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserById, User } from "../../redux/slices/userSlice";
import { updateUser } from "../../services/user";

interface EditFormProps {
    userData?: User
}

export const EditForm = ({ userData }: EditFormProps) => {

    const [open, setOpen] = useState(false)

    const [name, setName] = useState(userData?.name)
    const [nameError, setNameError] = useState(false)

    const [email, setEmail] = useState(userData?.email)
    const [emailError, setEmailError] = useState(false)

    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false)
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

        if(userData && name && email) {

            if(!emailRegex.test(email)) {
                setEmailError(true)
                return          
            }

            let updatedUser = {...userData}
            updatedUser.name = name
            updatedUser.email = email
            dispatch(updateUserById(updatedUser))
            try {
                updateUser(updatedUser)
            } catch(err) { console.error(err) }
            setOpen(true)
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

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} sx={{width: '600px'}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User updated with success!
                </Alert>
            </Snackbar>
        </div>
    )
}