import { User, UserData } from "../redux/slices/userSlice";

export const deleteUserById = async (userId: number) => {
    const res = await fetch(`${process.env.REACT_APP_URL!}/${userId}`, {
        method: 'DELETE'
    })
    return res
}

export const getUsers = async (): Promise<UserData[]> => {
    const res = await fetch(process.env.REACT_APP_URL!)
    const usersList = await res.json()
    return usersList
};

export const getUserById = async (userId: number): Promise<UserData> => {
    const res = await fetch(`${process.env.REACT_APP_URL!}/${userId}`)
    return await res.json()
};

export const createUser = async (user: User) => {
    const res = await fetch(process.env.REACT_APP_URL!, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    return res
}

export const updateUser = async (user: User) => {
    const res = await fetch(`${process.env.REACT_APP_URL!}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    return res
}