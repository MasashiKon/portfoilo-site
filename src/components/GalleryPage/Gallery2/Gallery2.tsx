import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  setIsPuzzle7Done,
  incrementFound,
} from "@/redux/reducers/localStrageSlice";
import { setIsPuzzle2Met, setIsPuzzle5Met } from "@/redux/reducers/puzzleSlice";
import { RootState } from "@/redux/store";
import { playSoundCorrect, playClickSound } from "@/utils/playSound";
import { Theme } from "@/types/localStrageValues";
import { generateDungen } from "@/utils/generateDungeon";

const puzzle5Threshhold = 250;
const puzzle5EffectWidth = 15;

const Gallery2 = ({ theme }: { theme: Theme | null }) => {
  const isPuzzle5Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle5Done
  );
  const isPuzzle7Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle7Done
  );
  const isPuzzle5Met = useSelector(
    (state: RootState) => state.puzzle.isPuzzle5Met
  );

  const isMute = useSelector((state: RootState) => state.localStorage.isMute);

  const [isGameStart, setIsGameStart] = useState(false);
  const [turn, setTurn] = useState(0);
  const [level, setLevel] = useState(1);
  const [hunger, setHunger] = useState(100);
  const [isGameClear, setIsGameClear] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const dispatch = useDispatch();

  const rock = useRef<HTMLImageElement>(null);
  const weed = useRef<HTMLImageElement>(null);
  const curPosX = useRef(0);
  const prePosX = useRef(100);

  const { dungeon, playerPosition } = useMemo(
    () => generateDungen(isGameStart, isGameOver, level),
    [isGameStart, level, isGameOver]
  );

  useEffect(() => {
    if (!rock.current || !weed.current) return;
    if (curPosX.current >= puzzle5Threshhold) return;
    const weedEle = weed.current;
    let mouseOriginX = 0;
    const mouseMove = (documentEv: MouseEvent) => {
      if (isPuzzle5Met) return;
      if (curPosX.current >= puzzle5Threshhold) return;

      const movement = documentEv.clientX - mouseOriginX;
      weedEle.style.left = movement + prePosX.current + "px";
      curPosX.current = movement + prePosX.current;

      if (curPosX.current >= puzzle5Threshhold) {
        weedEle.style.left = curPosX.current + puzzle5EffectWidth + "px";
        curPosX.current = curPosX.current + puzzle5EffectWidth;

        dispatch(setIsPuzzle5Met(true));
      }
    };
    const mousedown = (divEv: MouseEvent) => {
      if (curPosX.current >= puzzle5Threshhold) return;
      mouseOriginX = divEv.clientX;
      document.addEventListener("mousemove", mouseMove);
      weedEle.addEventListener("mouseleave", mouseup);
    };
    const mouseup = (mouse: MouseEvent) => {
      prePosX.current = curPosX.current;
      mouseOriginX = 0;
      document.removeEventListener("mousemove", mouseMove);
      weedEle.removeEventListener("mouseleave", mouseup);
    };
    weedEle.addEventListener("mousedown", mousedown);
    weedEle.addEventListener("mouseup", mouseup);

    return () => {
      weedEle.removeEventListener("mousedown", mousedown);
      weedEle.removeEventListener("mousedown", mouseup);
      weedEle.removeEventListener("mouseleave", mouseup);
      document.removeEventListener("mousemove", mouseMove);
    };
  }, [dispatch, isPuzzle5Met]);

  useEffect(() => {
    if (!isGameStart || !playerPosition) return;

    const playSoundCorrectWithUnmute = () => {
      if (!isMute) {
        playSoundCorrect();
      }
    };

    const playerController = (event: KeyboardEvent) => {
      if (playerPosition[0] === null || playerPosition[1] === null) return;
      if (isGameOver) return;
      if (event.key === "ArrowUp" || event.key === "w") {
        if (
          playerPosition[0] - 1 > 0 &&
          dungeon[playerPosition[0] - 1][playerPosition[1]]
        ) {
          playerPosition[0]--;
          if (dungeon[playerPosition[0]][playerPosition[1]] === 6) {
            setHunger((pre) => (pre + 10 > 100 ? 100 : pre + 10));
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
          } else if (dungeon[playerPosition[0]][playerPosition[1]] === 5) {
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
            playSoundCorrectWithUnmute();
            setIsGameClear(true);
            if (!isPuzzle7Done) {
              dispatch(setIsPuzzle7Done(true));
              setTimeout(() => {
                dispatch(incrementFound(null));
              }, 500);
            }
          }

          setTurn((preTurn) => {
            if ((preTurn + 1) % 5 === 0) {
              setHunger((preHunger) => preHunger - 1);
            }
            return preTurn + 1;
          });
        }
      } else if (event.key === "ArrowRight" || event.key === "d") {
        if (
          playerPosition[1] + 1 < dungeon[0].length - 1 &&
          dungeon[playerPosition[0]][playerPosition[1] + 1]
        ) {
          playerPosition[1]++;
          if (dungeon[playerPosition[0]][playerPosition[1]] === 6) {
            setHunger((pre) => (pre + 10 > 100 ? 100 : pre + 10));
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
          } else if (dungeon[playerPosition[0]][playerPosition[1]] === 5) {
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
            playSoundCorrectWithUnmute();
            setIsGameClear(true);
            if (!isPuzzle7Done) {
              dispatch(setIsPuzzle7Done(true));
              setTimeout(() => {
                dispatch(incrementFound(null));
              }, 500);
            }
          }
          setTurn((preTurn) => {
            if ((preTurn + 1) % 5 === 0) {
              setHunger((preHunger) => preHunger - 1);
            }
            return preTurn + 1;
          });
        }
      } else if (event.key === "ArrowDown" || event.key === "s") {
        if (
          playerPosition[0] + 1 < dungeon.length - 1 &&
          dungeon[playerPosition[0] + 1][playerPosition[1]]
        ) {
          playerPosition[0]++;
          if (dungeon[playerPosition[0]][playerPosition[1]] === 6) {
            setHunger((pre) => (pre + 10 > 100 ? 100 : pre + 10));
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
          } else if (dungeon[playerPosition[0]][playerPosition[1]] === 5) {
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
            playSoundCorrectWithUnmute();
            setIsGameClear(true);
            if (!isPuzzle7Done) {
              dispatch(setIsPuzzle7Done(true));
              setTimeout(() => {
                dispatch(incrementFound(null));
              }, 500);
            }
          }

          setTurn((preTurn) => {
            if ((preTurn + 1) % 5 === 0) {
              setHunger((preHunger) => preHunger - 1);
            }
            return preTurn + 1;
          });
        }
      } else if (event.key === "ArrowLeft" || event.key === "a") {
        if (
          playerPosition[1] - 1 > 0 &&
          dungeon[playerPosition[0]][playerPosition[1] - 1]
        ) {
          playerPosition[1]--;
          if (dungeon[playerPosition[0]][playerPosition[1]] === 6) {
            setHunger((pre) => (pre + 10 > 100 ? 100 : pre + 10));
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
          } else if (dungeon[playerPosition[0]][playerPosition[1]] === 5) {
            dungeon[playerPosition[0]][playerPosition[1]] = 1;
            setIsGameClear(true);
            if (!isPuzzle7Done) {
              playSoundCorrectWithUnmute();
              dispatch(setIsPuzzle7Done(true));
              setTimeout(() => {
                dispatch(incrementFound(null));
              }, 500);
            }
          }

          setTurn((preTurn) => {
            if ((preTurn + 1) % 5 === 0) {
              setHunger((preHunger) => preHunger - 1);
            }
            return preTurn + 1;
          });
        }
      }
      if (hunger <= 0) {
        setIsGameOver(true);
      }
    };
    window.addEventListener("keydown", playerController);

    return () => {
      window.removeEventListener("keydown", playerController);
    };
  }, [
    isGameStart,
    playerPosition,
    dungeon,
    dispatch,
    isPuzzle7Done,
    isMute,
    hunger,
    isGameOver,
  ]);

  if (
    dungeon &&
    playerPosition[0] !== null &&
    playerPosition[1] !== null &&
    dungeon[playerPosition[0]][playerPosition[1]] === 4
  ) {
    setLevel(level + 1);
  }
  return (
    <section className="h-screen w-screen pt-28 relative">
      <div className="h-full w-full pt-28 flex justify-center sm:text-xl">
        <div className="h-1/2 w-1/2 rounded-lg border-english-violet border-2 flex justify-center items-center">
          <div className="h-full w-full">
            {isGameStart ? (
              <div className="flex h-full w-full">
                <div className="w-10/12 h-full rounded-lg border-english-violet border-2 overflow-hidden ">
                  {isGameOver ? (
                    <div className="flex justify-center items-center h-full">
                      Game Over
                    </div>
                  ) : isGameClear ? (
                    <div className="flex flex-col justify-center items-center h-full">
                      <div className="mb-10">Well done!</div>
                      <button
                        onClick={() => {
                          setIsGameOver(false);
                          setIsGameClear(false);
                          setHunger(100);
                          setTurn(0);
                          setLevel(1);
                        }}
                      >
                        Restart
                      </button>
                    </div>
                  ) : (
                    dungeon
                      .map((row, i) => {
                        if (playerPosition[0] === null) return null;
                        if (
                          i < playerPosition[0] - 10 ||
                          playerPosition[0] + 10 < i
                        ) {
                          return null;
                        }
                        return (
                          <div key={i} className="flex">
                            {row.map((cell: number, j: number) => {
                              if (playerPosition[1] === null) return null;
                              if (
                                i === playerPosition[0] &&
                                j === playerPosition[1]
                              ) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-olivine"
                                        : "bg-dim-gray"
                                    }`}
                                    id="player"
                                  ></div>
                                );
                              } else if (cell === 0) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? " bg-english-violet"
                                        : "bg-english-violet"
                                    }`}
                                  ></div>
                                );
                              } else if (cell === 1) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-dim-gray"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                );
                              } else if (cell === 2) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-dim-gray"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                );
                              } else if (cell === 4) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-white"
                                        : "bg-olivine"
                                    }`}
                                  ></div>
                                );
                              } else if (cell === 5) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-orange-400"
                                        : "bg-orange-400"
                                    }`}
                                  ></div>
                                );
                              } else if (cell === 6) {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-mindaro"
                                        : "bg-green-500"
                                    }`}
                                  ></div>
                                );
                              } else {
                                return (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-5 w-5 ${
                                      theme === Theme.dark
                                        ? "bg-english-violet"
                                        : "bg-english-violet"
                                    } `}
                                  ></div>
                                );
                              }
                            })}
                          </div>
                        );
                      })
                      .filter((ele) => ele !== null)
                  )}
                </div>
                <div className="p-2">
                  <div>
                    <p>Level:</p>
                    <p>{level}</p>
                  </div>
                  <div>
                    <p>Hunger:</p>
                    <p>{hunger}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center h-full w-full">
                <div className="h-1/3 text-center">
                  Do you wanna challenge a little quest?
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onTap={() => setIsGameStart(true)}
                >
                  Start
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Image
        src={"/images/squirrel.svg"}
        width={80}
        height={80}
        alt="weed"
        className={`select-none absolute top-[75%] ${"fill-dim-gray"}`}
        ref={weed}
        style={{ left: 220 + "px" }}
        draggable={false}
      ></Image>
      <Image
        src={"/images/rock1.svg"}
        width={150}
        height={150}
        alt="rock"
        className={`select-none absolute top-[70%] ${"fill-dim-gray"}`}
        ref={rock}
        style={{ left: 100 + "px" }}
        draggable={false}
      ></Image>
      <Image
        src={"/images/weed.svg"}
        width={250}
        height={250}
        alt="weed"
        className={`select-none absolute top-[64%] ${"fill-dim-gray"}`}
        ref={weed}
        style={{
          left: isPuzzle5Done
            ? puzzle5Threshhold + puzzle5EffectWidth + "px"
            : prePosX.current + "px",
        }}
        draggable={false}
      ></Image>
    </section>
  );
};

export default Gallery2;
