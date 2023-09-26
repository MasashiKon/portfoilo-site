import { createSlice } from "@reduxjs/toolkit";
import {
  LocalStrage,
  LocalStrageValue,
  Theme,
} from "@/types/localStrageValues";

const initialState: LocalStrage = {
  isMute: null,
  isStarted: null,
  isTutorialDone: null,
  isPuzzle1Done: null,
  isPuzzle2Done: null,
  isPuzzle3Done: null,
  isPuzzle4Done: null,
  isPuzzle5Done: null,
  hasItem: null,
  hasWateringCan: null,
  foundTotal: 0,
  theme: null,
};

export const localStrageSlice = createSlice({
  name: "localStrage",
  initialState,
  reducers: {
    toggleIsMute: (state, _) => {
      localStorage.setItem(LocalStrageValue.is_mute, String(!state.isMute));
      state.isMute = !state.isMute;
    },
    setIsMute: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_mute, action.payload);
      state.isMute = action.payload;
    },
    toggleTheme: (state, _) => {
      if (state.theme === Theme.light) {
        localStorage.setItem(LocalStrageValue.theme, Theme.dark);
        state.theme = Theme.dark;
      } else {
        localStorage.setItem(LocalStrageValue.theme, Theme.light);
        state.theme = Theme.light;
      }
    },
    setTheme: (state, action) => {
      localStorage.setItem(LocalStrageValue.theme, action.payload);
      state.theme = action.payload;
    },
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
    setIsPuzzle2Done: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_puzzle2_done, action.payload);
      state.isPuzzle2Done = action.payload;
    },
    setIsPuzzle3Done: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_puzzle3_done, action.payload);
      state.isPuzzle3Done = action.payload;
    },
    setIsPuzzle4Done: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_puzzle4_done, action.payload);
      state.isPuzzle4Done = action.payload;
    },
    setIsPuzzle5Done: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_puzzle5_done, action.payload);
      state.isPuzzle5Done = action.payload;
    },
    setHasItem: (state, action) => {
      localStorage.setItem(LocalStrageValue.has_item, action.payload);
      state.hasItem = action.payload;
    },
    setHasWateringCan: (state, action) => {
      localStorage.setItem(LocalStrageValue.has_watering_can, action.payload);
      state.hasWateringCan = action.payload;
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
      state.isMute = true;
      state.isStarted = null;
      state.isTutorialDone = null;
      state.isPuzzle1Done = null;
      state.isPuzzle2Done = null;
      state.isPuzzle3Done = null;
      state.isPuzzle4Done = null;
      state.isPuzzle5Done = null;
      state.hasItem = null;
      state.hasWateringCan = null;
      state.foundTotal = 0;
    },
  },
});

export const {
  toggleIsMute,
  setIsMute,
  setTheme,
  toggleTheme,
  setIsStarted,
  setIsTutorialDone,
  setIsPuzzle1Done,
  setIsPuzzle2Done,
  setIsPuzzle3Done,
  setIsPuzzle4Done,
  setIsPuzzle5Done,
  setHasItem,
  setHasWateringCan,
  setfoundTotalToRedux,
  incrementFound,
  removeItem,
  removeAll,
} = localStrageSlice.actions;
export default localStrageSlice.reducer;
