"use client";

import { useDispatch, useSelector } from "react-redux";

import { setHasGreeting } from "@/redux/reducers/localStrageSlice";
import { RootState } from "@/redux/store";
import { Theme } from "@/types/localStrageValues";

const NotfoundPage = () => {
  const dispatch = useDispatch();
  const hasGreeting = useSelector(
    (state: RootState) => state.localStorage.hasGreeting
  );
  const isStarted = useSelector(
    (state: RootState) => state.localStorage.isStarted
  );
  const theme = useSelector((state: RootState) => state.localStorage.theme);
  return (
    <main
      className={`${
        theme === Theme.light
          ? "text-dim-gray"
          : "text-english-violet bg-dim-gray"
      }`}
    >
      <div className="pt-28 flex justify-center items-center h-screen w-screen">
        <p>Sorry, this page doesn&apos;t exist.</p>
      </div>
      {isStarted && !hasGreeting && (
        <div className="absolute pt-28 flex justify-center items-center top-0 h-screen w-screen">
          <h1
            className="rotate-45 select-none cursor-pointer font-bold"
            onClick={() => dispatch(setHasGreeting(true))}
          >
            Hi, I&apos;m Masashi.
          </h1>
        </div>
      )}
    </main>
  );
};

export default NotfoundPage;
