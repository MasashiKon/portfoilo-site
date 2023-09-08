import { createSlice } from "@reduxjs/toolkit";
import { Puzzle } from "@/types/puzzleType";

const initialState: Puzzle = {
  isTutorialMet: false,
  isPuzzle1Met: false,
};

export const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    setIsTutorialMet: (state, action) => {
      state.isTutorialMet = action.payload;
    },
    setIsPuzzle1Met: (state, action) => {
      state.isPuzzle1Met = action.payload;
    },
    removeAll: (state, _) => {
      state.isTutorialMet = false;
    },
  },
});

export const { setIsTutorialMet, setIsPuzzle1Met } = puzzleSlice.actions;
export default puzzleSlice.reducer;
