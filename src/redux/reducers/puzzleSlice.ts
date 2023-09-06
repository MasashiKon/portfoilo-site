import { createSlice } from "@reduxjs/toolkit";
import { Puzzle } from "@/types/puzzleType";

const initialState: Puzzle = {
  isTutorialMet: false,
};

export const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    setIsTutorialMet: (state, action) => {
      state.isTutorialMet = action.payload;
    },
  },
});

export const { setIsTutorialMet } = puzzleSlice.actions;
export default puzzleSlice.reducer;
