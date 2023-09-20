"use client";

import { useDispatch, useSelector } from "react-redux";
import { BsExclamationCircle, BsSun, BsMoon } from "react-icons/bs";
import { VscMute, VscUnmute } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  toggleIsMute,
  setIsMute,
  toggleTheme,
  setTheme,
  removeItem,
  setIsStarted,
  setfoundTotalToRedux,
  incrementFound,
  removeAll,
  setIsTutorialDone,
  setIsPuzzle1Done,
  setIsPuzzle2Done,
  setIsPuzzle3Done,
  setIsPuzzle4Done,
  setHasItem,
  setHasWateringCan,
} from "@/redux/reducers/localStrageSlice";
import { LocalStrageValue, Theme } from "@/types/localStrageValues";
import { RootState } from "@/redux/store";
import { playSoundCorrect, playClickSound } from "@/utils/playSound";
import { Items, Item, ItemsPath } from "@/types/itemsEnum";

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
  const [isItemWindowOpen, setIsItemWindowOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const dispatch = useDispatch();
  const isTutorialMet = useSelector(
    (state: RootState) => state.puzzle.isTutorialMet
  );
  const isPuzzle1Met = useSelector(
    (state: RootState) => state.puzzle.isPuzzle1Met
  );
  const isPuzzle2Met = useSelector(
    (state: RootState) => state.puzzle.isPuzzle2Met
  );
  const isPuzzle4Met = useSelector(
    (state: RootState) => state.puzzle.isPuzzle4Met
  );
  const cosmosPos = useSelector((state: RootState) => state.puzzle.cosmosPos);
  const isStarted = useSelector(
    (state: RootState) => state.localStorage.isStarted
  );
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );
  const isPuzzle1Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle1Done
  );
  const isPuzzle2Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle2Done
  );
  const isPuzzle3Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle3Done
  );
  const isPuzzle4Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle4Done
  );
  const hasItem = useSelector((state: RootState) => state.localStorage.hasItem);
  const hasWateringCan = useSelector(
    (state: RootState) => state.localStorage.hasWateringCan
  );
  const foundTotal = useSelector(
    (state: RootState) => state.localStorage.foundTotal
  );
  const isMute = useSelector((state: RootState) => state.localStorage.isMute);
  const theme = useSelector((state: RootState) => {
    if (state.localStorage.theme) {
      return state.localStorage.theme;
    }
    return Theme.dark;
  });
  const checkButton = useRef<HTMLButtonElement>(null);

  const playSoundCorrectWithUnmute = () => {
    if (!isMute) {
      playSoundCorrect();
    }
  };

  const handleCheckButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isTutorialMet && !isTutorialDone) {
      playSoundCorrectWithUnmute();
      setTimeout(() => {
        dispatch(setIsTutorialDone(true));
        setTimeout(() => {
          dispatch(incrementFound(null));
        }, 500);
      }, 200);
    } else if (isPuzzle1Met && !isPuzzle1Done) {
      playSoundCorrectWithUnmute();
      dispatch(setIsPuzzle1Done(true));
      setTimeout(() => {
        dispatch(incrementFound(null));
        setTimeout(() => {
          dispatch(setHasItem(true));
        }, 1000);
      }, 500);
    } else if (isPuzzle2Met && !isPuzzle2Done) {
      playSoundCorrectWithUnmute();
      dispatch(setIsPuzzle2Done(true));
      setTimeout(() => {
        dispatch(incrementFound(null));
      }, 500);
    } else if (isPuzzle4Met && !isPuzzle4Done) {
      playSoundCorrectWithUnmute();
      dispatch(setIsPuzzle4Done(true));
      setTimeout(() => {
        dispatch(incrementFound(null));
      }, 500);
    } else {
      if (isMute) return;
      playClickSound();
    }
  };

  useEffect(() => {
    const foundTotalLocal = localStorage.getItem(LocalStrageValue.found_total);

    if (!foundTotalLocal) return;
    dispatch(setfoundTotalToRedux(Number(foundTotalLocal)));
  }, [dispatch]);

  useEffect(() => {
    if (isMute === null) {
      const isMuteLocal = localStorage.getItem(LocalStrageValue.is_mute);
      dispatch(setIsMute(isMuteLocal === "false" ? false : true));
    }

    if (theme === null) {
      const themeLocal = localStorage.getItem(LocalStrageValue.theme);
      dispatch(setTheme(themeLocal === Theme.light ? Theme.light : Theme.dark));
    }

    if (isStarted === null) {
      const isStartedLocal = localStorage.getItem(LocalStrageValue.is_started);
      dispatch(setIsStarted(isStartedLocal === "true" ? true : false));
    }

    if (isTutorialDone === null) {
      const isTutorialDoneLocal = localStorage.getItem(
        LocalStrageValue.is_tutorial_done
      );
      dispatch(
        setIsTutorialDone(isTutorialDoneLocal === "true" ? true : false)
      );
    }

    if (isPuzzle1Done === null) {
      const isPuzzle1DoneLocal = localStorage.getItem(
        LocalStrageValue.is_puzzle1_done
      );
      dispatch(setIsPuzzle1Done(isPuzzle1DoneLocal === "true" ? true : false));
    }

    if (isPuzzle2Done === null) {
      const isPuzzle2DoneLocal = localStorage.getItem(
        LocalStrageValue.is_puzzle2_done
      );
      dispatch(setIsPuzzle2Done(isPuzzle2DoneLocal === "true" ? true : false));
    }

    if (isPuzzle3Done === null) {
      const isPuzzle3DoneLocal = localStorage.getItem(
        LocalStrageValue.is_puzzle3_done
      );
      dispatch(setIsPuzzle3Done(isPuzzle3DoneLocal === "true" ? true : false));
    }

    if (isPuzzle3Done === null) {
      const isPuzzle4DoneLocal = localStorage.getItem(
        LocalStrageValue.is_puzzle4_done
      );
      dispatch(setIsPuzzle4Done(isPuzzle4DoneLocal === "true" ? true : false));
    }

    if (hasItem === null) {
      const hasItemLocal = localStorage.getItem(LocalStrageValue.has_item);
      dispatch(setHasItem(hasItemLocal === "true" ? true : false));
    }

    if (hasWateringCan === null) {
      const hasWateringCanLocal = localStorage.getItem(
        LocalStrageValue.has_watering_can
      );
      dispatch(
        setHasWateringCan(hasWateringCanLocal === "true" ? true : false)
      );
      if (hasWateringCanLocal === "true") {
        setItems((pre) => {
          const newArr = pre.filter((item) => item.name !== Items.wateringCan);
          return [
            ...newArr,
            { name: Items.wateringCan, path: ItemsPath.wateringCan },
          ];
        });
      } else {
        setItems((pre) => {
          return pre.filter((item) => item.name !== Items.wateringCan);
        });
      }
    }
  }, [
    dispatch,
    isMute,
    theme,
    hasItem,
    hasWateringCan,
    isPuzzle1Done,
    isPuzzle2Done,
    isPuzzle3Done,
    isStarted,
    isTutorialDone,
    setItems,
  ]);

  useEffect(() => {
    if (hasWateringCan) {
      setItems((pre) => {
        const newArr = pre.filter((item) => item.name !== Items.wateringCan);
        return [
          ...newArr,
          { name: Items.wateringCan, path: ItemsPath.wateringCan },
        ];
      });
    }
  }, [hasWateringCan]);

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
    <div className="relative z-20">
      <div
        className={`fixed h-28 w-screen flex justify-between items-center p-5 transition-[border-color,background-color] duration-700 ${
          isTutorialDone &&
          "border-english-violet border-b-4 border-dashed bg-dim-gray/90 text-lime-50"
        }`}
      >
        <div>
          <Link href={"/"} className="block font-bold text-lg">
            Home
          </Link>
          {isTutorialDone && (
            <button
              className="text-sm"
              onClick={() => dispatch(removeAll("all"))}
            >
              Reset
            </button>
          )}
        </div>
        {isTutorialDone && (
          <motion.ul
            initial={{ y: "-100px" }}
            animate={{ y: "0px" }}
            className="w-1/2 flex justify-evenly items-center"
          >
            <motion.li layout>
              <Link
                href={"/gallery"}
                className="text-center grid place-content-center"
              >
                Gallery
              </Link>
            </motion.li>
            <motion.li layout>
              <Link
                href={"/contact-me"}
                className="text-center grid place-content-center"
              >
                Contact me
              </Link>
            </motion.li>
            {isPuzzle1Done &&
              (!hasItem ? (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div
                    onClick={() => setIsItemWindowOpen(!isItemWindowOpen)}
                    className="select-none cursor-pointer text-center grid place-content-center"
                  >
                    Item
                  </div>
                </motion.li>
              ) : (
                <motion.li layout>
                  <div
                    onClick={() => setIsItemWindowOpen(!isItemWindowOpen)}
                    className="select-none cursor-pointer text-center grid place-content-center"
                  >
                    Item
                  </div>
                </motion.li>
              ))}
          </motion.ul>
        )}
        <div className="flex">
          <div className="flex flex-col justify-evenly">
            <div
              className="mr-2 cursor-pointer"
              onClick={() => dispatch(toggleIsMute(null))}
            >
              {isMute === null ? (
                <VscMute className="w-6 h-6" />
              ) : isMute ? (
                <VscMute className="w-6 h-6" />
              ) : (
                <VscUnmute className="w-6 h-6" />
              )}
            </div>
            <div
              className="mr-2 cursor-pointer"
              onClick={() => dispatch(toggleTheme(null))}
            >
              {theme === Theme.light ? (
                <BsSun className="w-6 h-6" />
              ) : (
                <BsMoon className="w-6 h-6" />
              )}
            </div>
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
            <BsExclamationCircle className="w-20 h-20 active:scale-95" />
          </button>
        </div>
      </div>
      {isTutorialDone && (
        <motion.div
          className="fixed mt-32 right-5 h-10 w-10 rounded-md border-olivine border-4 bg-white flex justify-center items-center overflow-hidden select-none"
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
      {isPuzzle1Done && isItemWindowOpen && (
        <div className="w-[80%] h-20 fixed rounded-lg border-olivine border-2 mt-28 sm:mt-32 sm:ml-10 lg:ml-20 flex justify-evenly items-center bg-dim-gray/90">
          {items.map((item) => {
            return (
              <motion.div
                key={item.name}
                drag
                dragSnapToOrigin
                dragMomentum={false}
                onDragEnd={(e: MouseEvent) => {
                  if (!cosmosPos) return;
                  if (
                    cosmosPos.pageY < e.pageY &&
                    e.pageY < cosmosPos.pageY + cosmosPos.height &&
                    cosmosPos.pageX < e.clientX &&
                    e.clientX < cosmosPos.pageX + cosmosPos.width &&
                    !isPuzzle3Done
                  ) {
                    playSoundCorrectWithUnmute();
                    dispatch(setIsPuzzle3Done(true));
                    setItems((pre) => {
                      return pre.filter(
                        (item) => item.name !== Items.wateringCan
                      );
                    });
                    setIsItemWindowOpen(false);
                    setTimeout(() => {
                      dispatch(incrementFound(null));
                    }, 500);
                  }
                }}
                id={item.name}
              >
                <Image
                  src={item.path}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="select-none"
                  draggable={false}
                ></Image>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Header;
