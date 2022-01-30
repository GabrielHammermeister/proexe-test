import React from "react";
import { useParams } from "react-router-dom";
import { EditForm } from "../../components/EditForm/EditForm";
import { useAppSelector } from "../../redux/hooks";
import { selectUsers, User } from "../../redux/slices/userSlice";

export const EditPage = () => {
    const { userId } = useParams();    
    const users = useAppSelector(selectUsers)

    return (
        <>
            {
                users && <EditForm userData={users.find( (user: User) => user.id === Number(userId))}/>
            }
        </>
    )
}