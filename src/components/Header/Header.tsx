"use client";

import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  removeItem,
  setIsStarted,
  setfoundTotalToRedux,
  incrementFound,
  removeAll,
  setIsTutorialDone,
  setIsPuzzle1Done,
  setHasItem,
} from "@/redux/reducers/localStrageSlice";
import { LocalStrageValue } from "@/types/localStrageValues";
import { RootState } from "@/redux/store";
import { playSoundCorrect, playclickSound } from "@/utils/playSound";

enum buttonBorderStatus {
  inc = "inc",
  dec = "dec",
}

type ButtonBorderAlpha = {
  value: number;
  status: buttonBorderStatus;
};

function Header() {
  const [buttonBorderAlpha, setButtonBorderAlpha] = useState<ButtonBorderAlpha>(
    {
      value: 0,
      status: buttonBorderStatus.inc,
    }
  );
  const [intervalCount, setIntervalCount] = useState(0);

  const dispatch = useDispatch();
  const isTutorialMet = useSelector(
    (state: RootState) => state.puzzle.isTutorialMet
  );
  const isPuzzle1Met = useSelector(
    (state: RootState) => state.puzzle.isPuzzle1Met
  );
  const isStarted = useSelector(
    (state: RootState) => state.localStorage.isStarted
  );
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );
  const isPuzzle1Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle1Done
  );
  const hasItem = useSelector(
    (state: RootState) => state.localStorage.hasItem
  );
  const foundTotal = useSelector(
    (state: RootState) => state.localStorage.foundTotal
  );

  const checkButton = useRef<HTMLButtonElement>(null);

  const handleCheckButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isTutorialMet && !isTutorialDone) {
      playSoundCorrect();
      setTimeout(() => {
        dispatch(setIsTutorialDone(true));
        setTimeout(() => {
          dispatch(incrementFound(null));
        }, 500);
      }, 200);
    } else if (isPuzzle1Met && !isPuzzle1Done) {
      playSoundCorrect();
      dispatch(setIsPuzzle1Done(true));
      setTimeout(() => {
        dispatch(incrementFound(null));
        setTimeout(() => {
          dispatch(setHasItem(true));
        }, 1000)
      }, 500);
    } else {
      playclickSound();
    }
  };

  useEffect(() => {
    const foundTotalLocal = localStorage.getItem(LocalStrageValue.found_total);

    if (!foundTotalLocal) return;
    dispatch(setfoundTotalToRedux(Number(foundTotalLocal)));
  }, [dispatch]);

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

    if (hasItem === null) {
      const isPuzzle1Done = localStorage.getItem(
        LocalStrageValue.has_item
      );
      dispatch(setHasItem(hasItem === "true" ? true : false));
    }
  });

  useEffect(() => {
    if (isTutorialDone) return;
    const breathButton = setInterval(() => {
      if (
        isTutorialMet &&
        !isTutorialDone &&
        checkButton.current &&
        intervalCount >= 100
      ) {
        setButtonBorderAlpha((preButtonBorderAlpha) => {
          const value = preButtonBorderAlpha.value;
          if (buttonBorderAlpha.status === buttonBorderStatus.inc) {
            if (value >= 1) {
              return {
                status: buttonBorderStatus.dec,
                value: value - 0.05,
              };
            } else {
              return {
                ...preButtonBorderAlpha,
                value: value + 0.05,
              };
            }
          } else if (buttonBorderAlpha.status === buttonBorderStatus.dec) {
            if (value <= 0) {
              return {
                status: buttonBorderStatus.inc,
                value: preButtonBorderAlpha.value + 0.05,
              };
            } else {
              return {
                ...preButtonBorderAlpha,
                value: preButtonBorderAlpha.value - 0.05,
              };
            }
          } else {
            return {
              ...preButtonBorderAlpha,
              value: 0,
            };
          }
        });
      } else if (isTutorialMet && !isTutorialDone && checkButton.current) {
        setIntervalCount((pre) => ++pre);
      } else {
        setIntervalCount(0);
        setButtonBorderAlpha({ status: buttonBorderStatus.inc, value: 0 });
      }
    }, 50);

    return () => {
      clearInterval(breathButton);
    };
  }, [isTutorialMet, isTutorialDone, intervalCount, buttonBorderAlpha.status]);

  return (
    <div className="relative z-10">
      <div
        className={`fixed h-28 w-screen flex justify-between items-center p-5 transition-[border-color] duration-700 ${
          isTutorialDone && "border-english-violet border-b-4 border-dashed"
        }`}
      >
        <div>
          <p>Header</p>
          <button onClick={() => dispatch(removeAll("all"))}>reset</button>
        </div>
        {isTutorialDone && (
          <motion.ul
            initial={{ y: "-100px" }}
            animate={{ y: "0px" }}
            className="w-1/2 flex justify-evenly"
          >
            <motion.li layout>
              <Link href={"/gallery"}>Gallery</Link>
            </motion.li>
            <motion.li layout>
              <Link href={"/matter"}>tewtaw</Link>
            </motion.li>
            {isPuzzle1Done &&
              (!hasItem ? (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Link href={"/tsttet"}>pepe</Link>
                </motion.li>
              ) : (
                <motion.li layout>
                  <Link href={"/tsttet"}>popo</Link>
                </motion.li>
              ))}
          </motion.ul>
        )}
        <button
          className="flex justify-start items-center rounded-full bg-yellow-green w-20 h-20 md:bg-olivine md:hover:bg-yellow-green active:shadow-[inset_5px_5px_8px_8px_rgba(0,0,0,0.3)] transition-colors duration-300"
          style={{
            borderColor: `rgba(156, 118, 220, ${buttonBorderAlpha.value})`,
            borderWidth: "5px",
            borderStyle: "solid",
          }}
          onClick={handleCheckButton}
          ref={checkButton}
        >
          <HiOutlineSearchCircle className="w-20 h-20 active:scale-95" />
        </button>
      </div>
      {isTutorialDone && (
        <motion.div
          className="fixed mt-32 right-5 h-10 w-10 rounded-md border-olivine border-4 bg-white flex justify-center items-center overflow-hidden"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
        >
          <motion.div
            key={foundTotal}
            initial={{ y: foundTotal ? 50 : 0 }}
            animate={{ y: 0 }}
            exit={{ y: foundTotal ? -50 : 0 }}
          >
            {foundTotal}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Header;
