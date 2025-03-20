import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  value: number;
}

const initialState: GlobalState = {
  value: 0,
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    reset: (state) => {
      state.value = 0;
    },

    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, setValue } = globalSlice.actions;
export default globalSlice.reducer;
