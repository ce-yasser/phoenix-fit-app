import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "@interfaces";

interface UserState {
  showAuth: boolean;
  data: UserData | null;
  accessToken: string | null;
}

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken"),
  showAuth: false,
  data: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setShowAuth: (state, action: PayloadAction<boolean>) => {
      state.showAuth = action.payload;
    },
    logout: (state) => {
      state.data = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
    login: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
  },
});

export const { setShowAuth, logout, login, setUserData } = userSlice.actions;
export default userSlice.reducer;
