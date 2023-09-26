"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { setIsPuzzle2Met, setIsPuzzle5Met } from "@/redux/reducers/puzzleSlice";
import { RootState } from "@/redux/store";
import { Theme } from "@/types/localStrageValues";

const puzzle5Threshhold = 250;
const puzzle5EffectWidth = 15;

const GalleryPage = () => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.localStorage.theme);
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );
  const isPuzzle2Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle2Done
  );
  const isPuzzle5Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle5Done
  );
  const isPuzzle5Met = useSelector(
    (state: RootState) => state.puzzle.isPuzzle5Met
  );

  const [isRizard1Shown, setIsRizard1Shown] = useState(false);
  const [isRizard2Shown, setIsRizard2Shown] = useState(false);
  const [isRizard3Shown, setIsRizard3Shown] = useState(false);
  const [isRizard4Shown, setIsRizard4Shown] = useState(false);

  const dispatch = useDispatch();

  const rock = useRef<HTMLImageElement>(null);
  const weed = useRef<HTMLImageElement>(null);
  const curPosX = useRef(0);
  const prePosX = useRef(100);

  useEffect(() => {
    if (!isTutorialDone) {
      router.push("/");
    }
  });

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
    if (isPuzzle2Done) return;

    const rizard1Interval = setInterval(() => {
      setIsRizard1Shown(true);
      setTimeout(() => {
        setIsRizard1Shown(false);
        if (!isPuzzle2Done) return;
      }, 1000);
    }, 2400);

    const rizard2Interval = setInterval(() => {
      setIsRizard2Shown(true);
      setTimeout(() => {
        setIsRizard2Shown(false);
      }, 1000);
    }, 1440);

    const rizard3Interval = setInterval(() => {
      setIsRizard3Shown(true);
      setTimeout(() => {
        setIsRizard3Shown(false);
      }, 1000);
    }, 1800);

    const rizard4Interval = setInterval(() => {
      setIsRizard4Shown(true);
      setTimeout(() => {
        setIsRizard4Shown(false);
      }, 1000);
    }, 3600);

    return () => {
      clearInterval(rizard1Interval);
      clearInterval(rizard2Interval);
      clearInterval(rizard3Interval);
      clearInterval(rizard4Interval);
    };
  }, [isPuzzle2Done]);

  useEffect(() => {
    if (isRizard1Shown && isRizard2Shown && isRizard3Shown && isRizard4Shown) {
      dispatch(setIsPuzzle2Met(true));
    } else {
      dispatch(setIsPuzzle2Met(false));
    }
  }, [
    isRizard1Shown,
    isRizard2Shown,
    isRizard3Shown,
    isRizard4Shown,
    isPuzzle2Done,
    dispatch,
  ]);

  if (
    isPuzzle2Done &&
    (!isRizard2Shown || !isRizard2Shown || !isRizard2Shown || !isRizard2Shown)
  ) {
    setIsRizard1Shown(true);
    setIsRizard2Shown(true);
    setIsRizard3Shown(true);
    setIsRizard4Shown(true);
  }

  return (
    <main
      className={`transition-colors duration-200 relative ${
        theme === Theme.light
          ? "text-dim-gray"
          : "text-english-violet bg-dim-gray"
      }`}
    >
      <section className="grid grid-cols-2 grid-rows-2 h-screen w-screen pt-28 place-content-around relative">
        <div className="flex justify-center items-center z-10">
          <Link
            href={"https://concentration-cards.vercel.app/"}
            className="rounded-md md:w-80 lg:w-96"
          >
            <Image
              src={"/images/concentration.png"}
              width={2468}
              height={1188}
              alt="concentration"
              className="rounded-lg border-english-violet border-4 select-none"
            ></Image>
          </Link>
        </div>
        <div className="flex justify-center items-center z-10">
          <Link
            href={"https://web-development2-midterm-project.vercel.app/"}
            className="rounded-md md:w-80 lg:w-96"
          >
            <Image
              src={"/images/burger-hut.png"}
              width={2372}
              height={1590}
              alt="concentration"
              className="rounded-lg border-english-violet border-4 select-none"
            ></Image>
          </Link>
        </div>
        <div className="flex justify-center items-center z-10">
          <Link
            href={"https://dig-game.vercel.app/"}
            className="rounded-md md:w-80 lg:w-96"
          >
            <Image
              src={"/images/dig-game.png"}
              width={1590}
              height={1192}
              alt="concentration"
              className="rounded-lg border-english-violet border-4 select-none"
            ></Image>
          </Link>
        </div>
        <div className="flex justify-center items-center z-10">
          <Link
            href={"https://bopomofo-typer.vercel.app/"}
            className="rounded-md md:w-80 lg:w-96"
          >
            <Image
              src={"/images/bopomofo-typer.png"}
              width={1694}
              height={1274}
              alt="concentration"
              className="rounded-lg border-english-violet border-4 select-none"
            ></Image>
          </Link>
        </div>
        <AnimatePresence>
          {isRizard1Shown && (
            <motion.div
              initial={{ y: "40px" }}
              animate={{ y: "0px" }}
              exit={{ y: "40px" }}
              className={`absolute left-[15%] top-[23%] sm:top-[20%] md:top-[22%] lg:top-[20%]`}
            >
              <Image
                src={"/images/rizard1.svg"}
                width={50}
                height={50}
                alt="rizard"
                className="scale-75 md:scale-100 select-none"
              ></Image>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isRizard2Shown && (
            <motion.div
              initial={{ y: "-40px" }}
              animate={{ y: "25px" }}
              exit={{ y: "-40px" }}
              className={`absolute left-[70%] top-[38%] sm:top-[40%] md:top-[38%] lg:top-[44%]`}
            >
              <Image
                src={"/images/rizard1.svg"}
                width={50}
                height={50}
                alt="rizard"
                className="scale-75 md:scale-100 select-none rotate-180"
              ></Image>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isRizard3Shown && (
            <motion.div
              initial={{ y: "40px" }}
              animate={{ y: "0px" }}
              exit={{ y: "55px" }}
              className={`absolute left-[30%] top-[63%] sm:top-[60%] md:top-[61%] lg:top-[57%]`}
            >
              <Image
                src={"/images/rizard2.svg"}
                width={50}
                height={50}
                alt="rizard"
                className="scale-75 md:scale-100 select-none"
              ></Image>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isRizard4Shown && (
            <motion.div
              initial={{ y: "40px" }}
              animate={{ y: "0px" }}
              exit={{ y: "55px" }}
              className={`absolute left-[75%] top-[63%] sm:top-[60%] md:top-[61%] lg:top-[57%]`}
            >
              <Image
                src={"/images/rizard3.svg"}
                width={50}
                height={50}
                alt="rizard"
                className="scale-75 md:scale-100 select-none"
              ></Image>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <section className="h-screen w-screen pt-28 relative">
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
    </main>
  );
};

export default GalleryPage;
