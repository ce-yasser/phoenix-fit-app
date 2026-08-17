import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import ProgramsReducer from "./slices/programsSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    programs: ProgramsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
