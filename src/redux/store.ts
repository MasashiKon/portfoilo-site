import { configureStore } from "@reduxjs/toolkit";
import localStrageReducer from "@/redux/reducers/localStrageSlice";
import puzzleReducer from "@/redux/reducers/puzzleSlice";

export const store = configureStore({
  reducer: {
    localStorage: localStrageReducer,
    puzzle: puzzleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
