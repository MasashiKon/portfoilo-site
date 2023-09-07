"use client";

import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSearchCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  removeItem,
  setIsStarted,
  setfoundTotalToRedux,
  incrementFound,
  removeAll,
  setIsTutorialDone,
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
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
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
      <div className="fixed h-20 w-screen flex justify-between items-center p-5 pt-10">
        <div>
          <p>Header</p>
          <button onClick={() => dispatch(removeAll("all"))}>reset</button>
        </div>
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
          className="fixed mt-28 right-5 h-10 w-10 rounded-md border-olivine border-4 bg-white flex justify-center items-center overflow-hidden"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
        >
          <motion.div
            key={foundTotal}
            initial={{ y: foundTotal ? 50 : 0}}
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
