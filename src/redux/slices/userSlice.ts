import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/userStore';

export type UserData = { 
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    city: string
  }
}
export type User = { 
  id: number,
  name: string,
  email: string,
  username?: string,
  city?: string
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
    },
    updateUserById: (state, action: PayloadAction<User>) => {
      const users = state.value
      if(users) {
        const userIndex = users.findIndex( user => user.id === action.payload.id)

        users.splice(userIndex, 1, action.payload)
        state.value = users
      }
    },
    removeUserById: (state, action: PayloadAction<number>) => {
      const users = state.value
      if(users) {
        const userIndex = users.findIndex( user => user.id === action.payload)

        users.splice(userIndex, 1)
        state.value = users
      }
    },
    addNewUser: (state, action: PayloadAction<any>) => {      
      const users = state.value
      if(users) {
        const newUser = action.payload
        newUser.id = (users.length + 1)
        users.push(newUser)
        state.value = users
      }
    },
  },
});

export const { fetchUsers, updateUserById, removeUserById, addNewUser } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users.value;

export default userSlice.reducer;