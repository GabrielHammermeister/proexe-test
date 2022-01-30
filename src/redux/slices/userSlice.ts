import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/userStore';

type UserData = { 
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    city: string
  }
}
type User = { 
  id: number,
  name: string,
  username: string,
  email: string,
  city: string
  
}
export interface UserState {
  value?: User[]
}

const initialState: UserState = {
  value: []
};


export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<UserData[]>) => {
      state.value = action.payload.map( (user) => (
        {
          id: user.id,
          name: user.name,
          username: user.username,
          city: user.address.city,
          email: user.email
        }))
    }
  },
});

export const { fetchUsers } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export const findUserById = (state: RootState, userId: number) => {
  
}

export default userSlice.reducer;