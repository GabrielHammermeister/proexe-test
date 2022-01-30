import React from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { EditForm } from "../../components/EditForm/EditForm"

export const EditPage = () => {
    const { userId } = useParams();    

    return (
        <>
            <EditForm userId={Number(userId)}/>
        </>
    )
}