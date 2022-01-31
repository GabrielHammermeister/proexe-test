import { FormHelperText } from "@mui/material"
import React from "react"

interface CustomHelperTextProps {
    field: 'name' | 'email'
    error: boolean
}

export const CustomHelperText = ({ field, error }: CustomHelperTextProps) => {

    switch(field) {
        case 'email':
            return (
                <>
                    {
                        error ?
                        (<FormHelperText error>Enter a valid email</FormHelperText>)
                        :
                        (<FormHelperText>Enter a Email</FormHelperText>)
                    }
                </>
            )

        case 'name':
            return (
                <>
                    {
                        error ?
                        (<FormHelperText error>This field is required</FormHelperText>)
                        :
                        (<FormHelperText>Enter a Name</FormHelperText>)
                    }
                </>
            )
    }
}