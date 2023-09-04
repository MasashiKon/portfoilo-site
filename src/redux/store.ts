import { configureStore } from "@reduxjs/toolkit";
import localStrageReducer from "@/redux/reducers/localStrageSlice";

export const store = configureStore({
  reducer: {
    localStorage: localStrageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
