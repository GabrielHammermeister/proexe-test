import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditForm } from "../../components/EditForm/EditForm";
import { User } from "../../redux/slices/userSlice";
import { getUserById } from "../../services/user";
import { parseUser } from "../../utils/parseUser";

export const EditPage = () => {
    const { userId } = useParams();    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>({} as any);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(Number(userId))
                await setUser(parseUser(data))
                setLoading(false)
            } catch(err) { console.error(err) }
        };
        fetchUser()
    }, [userId, loading]);
    
    return (
        <>
            {
                loading ?
                (
                    <LinearProgress/>
                )
                :
                (
                    <EditForm userData={user}/>
                )
            }
        </>
    )
}