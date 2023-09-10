"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { setIsPuzzle2Met } from "@/redux/reducers/puzzleSlice";
import { RootState } from "@/redux/store";

const GalleryPage = () => {
  const router = useRouter();
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );
  const isPuzzle2Done = useSelector(
    (state: RootState) => state.localStorage.isPuzzle2Done
  );

  const [isRizard1Shown, setIsRizard1Shown] = useState(false);
  const [isRizard2Shown, setIsRizard2Shown] = useState(false);
  const [isRizard3Shown, setIsRizard3Shown] = useState(false);
  const [isRizard4Shown, setIsRizard4Shown] = useState(false);

  const dispatch = useDispatch();

  if (!isTutorialDone) {
    router.push("/");
  }

  if (
    isPuzzle2Done &&
    (!isRizard2Shown || !isRizard2Shown || !isRizard2Shown || !isRizard2Shown)
  ) {
    setIsRizard1Shown(true);
    setIsRizard2Shown(true);
    setIsRizard3Shown(true);
    setIsRizard4Shown(true);
  }

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

  return (
    <div className="pt-28 h-screen w-screen">
      <section className="grid grid-cols-2 grid-rows-2 h-full w-full place-content-around">
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
              animate={{ y: "15px" }}
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
    </div>
  );
};

export default GalleryPage;
