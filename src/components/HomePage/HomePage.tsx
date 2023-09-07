"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiCypress,
  SiDocker,
  SiPython,
  SiCsharp,
  SiTypescript,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJest,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiUnity,
  SiTestinglibrary,
  SiNodedotjs,
  SiExpress,
} from "react-icons/si";

import { LocalStrageValue } from "@/types/localStrageValues";
import { RootState } from "@/redux/store";
import {
  setIsStarted,
  setIsTutorialDone,
} from "@/redux/reducers/localStrageSlice";
import { setIsTutorialMet } from "@/redux/reducers/puzzleSlice";

const techStack = [
  <SiReact key="SiReact" className="h-20 w-20"/>,
  <SiNextdotjs key="SiNextdotjs" className="h-20 w-20"/>,
  <SiJavascript key="SiJavascript" className="h-20 w-20"/>,
  <SiCss3 key="SiCss3" className="h-20 w-20"/>,
  <SiHtml5 key="SiHtml5" className="h-20 w-20"/>,
  <SiCypress key="SiCypress" className="h-20 w-20"/>,
  <SiDocker key="SiDocker" className="h-20 w-20"/>,
  <SiPython key="SiPython" className="h-20 w-20"/>,
  <SiCsharp key="SiCsharp" className="h-20 w-20"/>,
  <SiTypescript key="SiTypescript" className="h-20 w-20"/>,
  <SiGit key="SiGit" className="h-20 w-20"/>,
  <SiGithub key="SiGithub" className="h-20 w-20"/>,
  <SiGitlab key="SiGitlab" className="h-20 w-20"/>,
  <SiJest key="SiJest" className="h-20 w-20"/>,
  <SiRedux key="SiRedux" className="h-20 w-20"/>,
  <SiPostgresql key="SiPostgresql" className="h-20 w-20"/>,
  <SiMongodb key="SiMongodb" className="h-20 w-20"/>,
  <SiUnity key="SiUnity" className="h-20 w-20"/>,
  <SiTestinglibrary key="SiTestinglibrary" className="h-20 w-20"/>,
  <SiNodedotjs key="SiNodedotjs" className="h-20 w-20"/>,
  <SiExpress key="SiExpress" className="h-20 w-20"/>,
];

const HomePage = () => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  const isStarted = useSelector(
    (state: RootState) => state.localStorage.isStarted
  );
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );
  const isTutorialMet = useSelector(
    (state: RootState) => state.puzzle.isTutorialMet
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStarted === null) {
      const isStartedLocal = localStorage.getItem(LocalStrageValue.is_started);
      dispatch(setIsStarted(isStartedLocal === "true" ? true : false));
    }

    if (isTutorialDone === null) {
      const isTutorialDone = localStorage.getItem(
        LocalStrageValue.is_tutorial_done
      );
      dispatch(setIsTutorialDone(isTutorialDone === "true" ? true : false));
    }

    document.body.onscroll = () => {
      setBodyHeight(document.body.scrollHeight);
      setBodyWidth(document.body.scrollWidth);
      setScrollY(window.scrollY);
    };
    setInnerWidth(window.innerHeight);

    return () => {
      document.body.onscroll = null;
    };
  }, [isStarted, isTutorialDone, dispatch]);

  useEffect(() => {
    if (
      isStarted &&
      scrollY >= bodyHeight - innerWidth - (bodyWidth < 768 ? 80 : 0)
    ) {
      dispatch(setIsTutorialMet(true));
    } else {
      dispatch(setIsTutorialMet(false));
    }
  }, [
    scrollY,
    bodyHeight,
    bodyWidth,
    innerWidth,
    isTutorialMet,
    isStarted,
    dispatch,
  ]);

  useEffect(() => {}, [dispatch]);

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
        {!isTutorialDone && (
          <Image
            src={"/deer1.svg"}
            width={100}
            height={100}
            alt="tete"
            className={`fixed safariImg select-none -left-[100px] bottom-[10%] ${
              isStarted && "translate-x-[200px]"
            }`}
          />
        )}
      </section>
      {isStarted && (
        <section className="relative h-screen w-screen">
          {isTutorialDone && (
            <>

              <div className="h-full w-screen flex justify-center items-center">
                <ul className="grid grid-cols-3">
                  {techStack.map((item, i) => {
                    return (
                      <motion.li
                        key={"li_" + item.key}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
          <Image
            src={"/deer1.svg"}
            width={100}
            height={100}
            alt="tete"
            className={`absolute safariImg select-none left-[100px] bottom-[10%] ${
              !isTutorialDone && "opacity-40"
            }`}
          />
        </section>
      )}
    </main>
  );
};

export default HomePage;
