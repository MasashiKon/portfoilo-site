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
  setIsPuzzle1Done,
} from "@/redux/reducers/localStrageSlice";
import {
  setIsTutorialMet,
  setIsPuzzle1Met,
} from "@/redux/reducers/puzzleSlice";
import { transform } from "typescript";

const techsClass = "h-20 w-20 text-dim-gray select-none";

const techStack = [
  <SiReact
    key="SiReact"
    className={techsClass}
    dataanswer={[0, 1, 2, 3, 4, 5]}
  />,
  <SiNextdotjs key="SiNextdotjs" className={techsClass} dataanswer={[0]} />,
  <SiJavascript key="SiJavascript" className={techsClass} dataanswer={[0]} />,
  <SiCss3 key="SiCss3" className={techsClass} dataanswer={[0]} />,
  <SiHtml5 key="SiHtml5" className={techsClass} dataanswer={[0]} />,
  <SiCypress key="SiCypress" className={techsClass} dataanswer={[0]} />,
  <SiDocker key="SiDocker" className={techsClass} dataanswerr={[0]} />,
  <SiPython key="SiPython" className={techsClass} dataanswer={[0, 3]} />,
  <SiCsharp key="SiCsharp" className={techsClass} dataanswer={[0]} />,
  <SiTypescript key="SiTypescript" className={techsClass} dataanswer={[0]} />,
  <SiGit key="SiGit" className={techsClass} dataanswer={[0]} />,
  <SiGithub key="SiGithub" className={techsClass} dataanswer={[0]} />,
  <SiGitlab key="SiGitlab" className={techsClass} dataanswer={[0]} />,
  <SiJest key="SiJest" className={techsClass} dataanswer={[0]} />,
  <SiRedux key="SiRedux" className={techsClass} dataanswer={[0, 2, 4]} />,
  <SiPostgresql key="SiPostgresql" className={techsClass} dataanswer={[0]} />,
  <SiMongodb key="SiMongodb" className={techsClass} dataanswer={[0]} />,
  <SiUnity key="SiUnity" className={techsClass} dataanswer={[0, 2, 4]} />,
  <SiTestinglibrary
    key="SiTestinglibrary"
    className={techsClass}
    dataanswer={[0]}
  />,
  <SiNodedotjs key="SiNodedotjs" className={techsClass} dataanswer={[0]} />,
  <SiExpress key="SiExpress" className={techsClass} dataanswer={[0]} />,
];

const pickupNineTechs = () => {
  const copyArr = techStack.map((tech) => tech);
  const nineTechs = [];
  for (let i = 0; i < 9; i++) {
    const index = Math.floor(Math.random() * copyArr.length);
    const pickedTech = copyArr.splice(index, 1)[0];
    nineTechs.push(pickedTech);
  }

  return nineTechs;
};

const genRandomDeg = () => (Math.floor(Math.random() * 5) + 1) * 60;

const HomePage = () => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [nineTechs, setNineTechs] = useState(pickupNineTechs());
  const [currentDeg, setCurrentDeg] = useState([
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
    genRandomDeg(),
  ]);

  const [techsCorrect, setTechsCorrect] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const isStarted = useSelector(
    (state: RootState) => state.localStorage.isStarted
  );
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );
  const isTutorialMet = useSelector(
    (state: RootState) => state.puzzle.isTutorialMet
  );
  const isPuzzle1Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle1Done
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

    if (isPuzzle1Done === null) {
      const isPuzzle1Done = localStorage.getItem(
        LocalStrageValue.is_puzzle1_done
      );
      dispatch(setIsPuzzle1Done(isPuzzle1Done === "true" ? true : false));
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
  }, [isStarted, isTutorialDone, isPuzzle1Done, dispatch]);

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

  useEffect(() => {
    setTechsCorrect(() => {
      return nineTechs.map((item, i) => {
        const answer: number[] = item.props.dataanswer;
        if (!answer) return false;
        return answer.some((num) => num === (currentDeg[i] % 360) / 60);
      });
    });
  }, [currentDeg, nineTechs]);

  useEffect(() => {
    dispatch(setIsPuzzle1Met(techsCorrect.every((bool) => bool)));
  }, [techsCorrect, dispatch]);

  useEffect(() => {
    if (!isPuzzle1Done) return;
    setCurrentDeg([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }, [isPuzzle1Done]);

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
              <div className="h-[20%] w-screen flex justify-center items-center text-dim-gray">
                My TeckStack
              </div>
              <div className="h-[80%] w-screen flex justify-center items-center pb-72">
                <ul className="grid grid-cols-3 gap-10">
                  {nineTechs.map((item, i) => {
                    return (
                      <motion.li
                        key={"li_" + item.key}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transform: `rotate(${currentDeg[i]}deg)`,
                        }}
                        transition={{
                          opacity: { duration: 0.3, delay: i * 0.1 },
                          x: { duration: 0.3, delay: i * 0.1 },
                          transform: { duration: 0.3 },
                        }}
                        onClick={() => {
                          setCurrentDeg((pre) => {
                            if (isPuzzle1Done) return pre;
                            const newArr = pre.map((num) => num);
                            newArr[i] = newArr[i] + 60;
                            return newArr;
                          });
                        }}
                        whileTap={{
                          transform: isPuzzle1Done ? "rotate(60deg)" : "",
                        }}
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
