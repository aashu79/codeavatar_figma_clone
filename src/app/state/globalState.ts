import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  cardCount: { cardId: number; viewCount: number; shareCount: number }[];
}

const initialState: GlobalState = {
  cardCount: [],
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    increaseViewCount: (state, action: PayloadAction<{ id: number }>) => {
      const cardId = action.payload.id;
      const card = state.cardCount.find((card) => card.cardId === cardId);
      if (card) {
        card.viewCount += 1;
      } else {
        state.cardCount.push({ cardId: cardId, viewCount: 1, shareCount: 0 });
      }
    },

    increaseShareCount: (state, action: PayloadAction<{ id: number }>) => {
      const cardId = action.payload.id;
      const card = state.cardCount.find((card) => card.cardId === cardId);
      if (card) {
        card.shareCount += 1;
      } else {
        state.cardCount.push({ cardId: cardId, viewCount: 0, shareCount: 1 });
      }
    },
  },
});

export const { increaseViewCount, increaseShareCount } = globalSlice.actions;
export default globalSlice.reducer;
