"use client";

import { useDispatch, useSelector } from "react-redux";
import { HiOutlineSearchCircle } from "react-icons/hi";

import { removeItem } from "@/redux/reducers/localStrageSlice";
import { LocalStrageValue } from "@/types/localStrageValues";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";

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

  const checkButton = useRef<HTMLButtonElement>(null);

  const handleCheckButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isTutorialMet) {
      console.log("ok");
    }
  };

  useEffect(() => {
    const breathButton = setInterval(() => {
      if (
        isTutorialMet &&
        !isTutorialDone &&
        checkButton.current &&
        intervalCount >= 200
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
    <div className="fixed h-20 w-screen z-10 flex justify-between items-center p-5 pt-10">
      <div>
        <p>Header</p>
        <button
          onClick={() => dispatch(removeItem(LocalStrageValue.is_started))}
        >
          reset
        </button>
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
  );
}

export default Header;
