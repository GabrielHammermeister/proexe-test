import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/userStore';

type User = {
  id: number,
  name: string,
  username: string,
  city: string,
  email: string
}

export interface UserState {
  users?: User[]
}

const initialState: UserState = {
  users: []
};


export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<[]>) => {
        state.users = [...action.payload]
    }
  },
});

export const { fetchUsers } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
