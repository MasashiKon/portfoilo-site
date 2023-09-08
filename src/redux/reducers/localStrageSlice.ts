import { createSlice } from "@reduxjs/toolkit";
import { LocalStrage, LocalStrageValue } from "@/types/localStrageValues";

const initialState: LocalStrage = {
  isStarted: null,
  isTutorialDone: null,
  isPuzzle1Done: null,
  foundTotal: 0,
};

export const localStrageSlice = createSlice({
  name: "localStrage",
  initialState,
  reducers: {
    setIsStarted: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_started, action.payload);
      state.isStarted = action.payload;
    },
    setIsTutorialDone: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_tutorial_done, action.payload);
      state.isTutorialDone = action.payload;
    },
    setIsPuzzle1Done: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_puzzle1_done, action.payload);
      state.isPuzzle1Done = action.payload;
    },
    setfoundTotalToRedux: (state, action) => {
      state.foundTotal = action.payload;
    },
    incrementFound: (state, _) => {
      localStorage.setItem(
        LocalStrageValue.found_total,
        String(state.foundTotal + 1)
      );
      state.foundTotal++;
    },
    removeItem: (
      state,
      action: { payload: LocalStrageValue; type: string }
    ) => {
      if (action.payload === LocalStrageValue.is_started) {
        localStorage.removeItem(action.payload);
        state.isStarted = null;
      }
      if (action.payload === LocalStrageValue.is_tutorial_done) {
        localStorage.removeItem(action.payload);
        state.isTutorialDone = null;
      }
      if (action.payload === LocalStrageValue.is_puzzle1_done) {
        localStorage.removeItem(action.payload);
        state.isPuzzle1Done = null;
      }
    },
    removeAll: (state, _) => {
      localStorage.clear();
      state.isStarted = null;
      state.isTutorialDone = null;
      state.isPuzzle1Done = null;
      state.foundTotal = 0;
    },
  },
});

export const {
  setIsStarted,
  setIsTutorialDone,
  setIsPuzzle1Done,
  setfoundTotalToRedux,
  incrementFound,
  removeItem,
  removeAll,
} = localStrageSlice.actions;
export default localStrageSlice.reducer;
