"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import Header from "../Header.tsx/Header";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
