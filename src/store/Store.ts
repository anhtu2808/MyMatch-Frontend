import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
