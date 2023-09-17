import { createSlice } from "@reduxjs/toolkit";
import { Puzzle } from "@/types/puzzleType";
import { ItemPos } from "@/types/puzzleType";

const initialState: Puzzle = {
  isTutorialMet: false,
  isPuzzle1Met: false,
  isPuzzle2Met: false,
  isPuzzle4Met: false,
  cosmosPos: null,
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
    setIsPuzzle2Met: (state, action) => {
      state.isPuzzle2Met = action.payload;
    },
    setIsPuzzle4Met: (state, action) => {
      state.isPuzzle4Met = action.payload;
    },
    setCosmosPos: (state, action: { payload: ItemPos; type: string }) => {
      state.cosmosPos = action.payload;
    },
    removeAll: (state, _) => {
      state.isTutorialMet = false;
    },
  },
});

export const {
  setIsTutorialMet,
  setIsPuzzle1Met,
  setIsPuzzle2Met,
  setIsPuzzle4Met,
  setCosmosPos,
} = puzzleSlice.actions;
export default puzzleSlice.reducer;
