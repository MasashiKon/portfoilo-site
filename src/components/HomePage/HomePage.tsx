"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import { LocalStrageValue } from "@/localStrage/localStrageValues";
import { RootState } from "@/redux/store";
import { setIsStarted } from "@/redux/reducers/localStrageSlice";

const HomePage = () => {
  const isStarted = useSelector(
    (state: RootState) => state.localStorage.isStarted
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const isStartedLocal = Boolean(
      localStorage.getItem(LocalStrageValue.is_started)
    );
    dispatch(setIsStarted(isStartedLocal));
  }, [dispatch]);

  return (
    <main>
      <section className="flex justify-center items-center h-screen w-screen relative">
        {isStarted !== null && !isStarted && (
          <div
            className={`cursor-pointer hover:text-xl active:text-sm select-none transition-{font-size} transition-{line-height} duration-200`}
            onClick={() => {
              dispatch(setIsStarted(true));
              localStorage.setItem(LocalStrageValue.is_started, "true");
            }}
          >
            <h1>Hi, I&apos;m Masashi.</h1>
          </div>
        )}
        <Image
          src={"/cloud1.svg"}
          width={200}
          height={200}
          alt="tete"
          className={`absolute safariImg select-none left-[10%] -top-[200px] hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${
            isStarted && "translate-y-[250px]"
          }`}
        />
        <Image
          src={"/tree1.svg"}
          width={200}
          height={200}
          alt="tete"
          className={`absolute safariImg select-none -left-[200px] bottom-[5%] ${
            isStarted && "translate-x-[100px]"
          }`}
        />
        <Image
          src={"/tree1.svg"}
          width={200}
          height={200}
          alt="tete"
          className={`absolute safariImg select-none -left-[200px] bottom-[10%] ${
            isStarted && "translate-x-[150px]"
          }`}
        />
        <Image
          src={"/tree1.svg"}
          width={200}
          height={200}
          alt="tete"
          className={`absolute safariImg select-none left-full bottom-[5%] ${
            isStarted && "-translate-x-[100px]"
          }`}
        />
        <Image
          src={"/tree1.svg"}
          width={200}
          height={200}
          alt="tete"
          className={`absolute safariImg select-none left-full bottom-[10%] ${
            isStarted && "-translate-x-[150px]"
          }`}
        />
        <Image
          src={"/deer1.svg"}
          width={100}
          height={100}
          alt="tete"
          className={`absolute safariImg select-none -left-[100px] bottom-[10%] ${
            isStarted && "translate-x-[200px]"
          }`}
        />
      </section>
      <section className="h-screen"></section>
    </main>
  );
};

export default HomePage;
