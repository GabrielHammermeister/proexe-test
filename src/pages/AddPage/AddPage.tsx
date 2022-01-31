import React from "react";
import { useParams } from "react-router-dom";
import { AddForm } from "../../components/AddForm/AddForm";
import { EditForm } from "../../components/EditForm/EditForm";
import { useAppSelector } from "../../redux/hooks";
import { selectUsers, User } from "../../redux/slices/userSlice";

export const AddPage = () => {
    const { userId } = useParams();    
    const users = useAppSelector(selectUsers)

    // Tem que fazer o POST request, pegar a resopnse e armazenar no redux

    return (
        <>
            {
                users && <AddForm/>
            }
        </>
    )
}