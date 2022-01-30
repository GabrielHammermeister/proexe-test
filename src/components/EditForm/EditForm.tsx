import { Card, CardContent, CardHeader, Divider, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";

interface EditFormProps {
    userId: number
}

export const EditForm = ({ userId }: EditFormProps) => {

    useEffect(() => {
      
    }, []);
    

    return (
        <Card style={{height: '400px', width: '400px', margin: '0 auto'}}>
            <CardHeader title={`Edit user ${userId}`}/>
            <Divider/>
            <CardContent>
                <TextField sx={{m: 2}} required label="name" helperText="Enter a valid name"/>
                <TextField sx={{m: 2}} required label="Email" helperText="Enter a valid email" type="email"/>
            </CardContent>
        </Card> 
    )
}