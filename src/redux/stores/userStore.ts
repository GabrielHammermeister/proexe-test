import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

export const userStore = configureStore({
    reducer: {
      users: userReducer
    },
  });

  export type AppDispatch = typeof userStore.dispatch;
export type RootState = ReturnType<typeof userStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
