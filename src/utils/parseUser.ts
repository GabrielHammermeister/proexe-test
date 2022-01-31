import { User, UserData } from "../redux/slices/userSlice";

export const parseUser = (user: UserData): User => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city
    }
}