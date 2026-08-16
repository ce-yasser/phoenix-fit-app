import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "@interfaces";

interface UserState {
  showAuth: boolean;
  data: UserData | null;
}

const initialState: UserState = {
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
  },
});

export const { setShowAuth } = userSlice.actions;
export default userSlice.reducer;
