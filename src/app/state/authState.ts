import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  isLoggedIn: boolean;
}

const initialState: authState = {
  isLoggedIn: true,
};

const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoginState } = authSlice.actions;
export default authSlice.reducer;
