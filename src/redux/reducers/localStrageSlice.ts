import { createSlice } from "@reduxjs/toolkit";
import { LocalStrage, LocalStrageValue } from "@/types/localStrageValues";

const initialState: LocalStrage = {
  isStarted: null,
  isTutorialDone: false,
};

export const localStrageSlice = createSlice({
  name: "localStrage",
  initialState,
  reducers: {
    setIsStarted: (state, action) => {
      localStorage.setItem(LocalStrageValue.is_started, action.payload);
      state.isStarted = action.payload;
    },
    setIsTutorialDone: (state) => {
      localStorage.setItem(LocalStrageValue.is_tutorial_done, "true");
      state.isTutorialDone = true;
    },
    removeItem: (
      state,
      action: { payload: LocalStrageValue; type: string }
    ) => {
      localStorage.removeItem(action.payload);
      if (action.payload === LocalStrageValue.is_started) {
        state.isStarted = false;
      }
    },
  },
});

export const { setIsStarted, removeItem } = localStrageSlice.actions;
export default localStrageSlice.reducer;
