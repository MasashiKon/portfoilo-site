"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryPage = () => {
  const [isRizardShown, setIsRizardShown] = useState(false);

  useEffect(() => {
    const appearInterval = setInterval(() => {
      setIsRizardShown((pre) => !pre);
    }, 10000);

    return () => {
      clearInterval(appearInterval);
    };
  }, []);

  return (
    <div className="pt-28 h-screen w-screen">
      <section className="grid grid-cols-2 grid-rows-2 h-full w-full place-content-around">
        <div className="flex justify-center items-center z-10">
          <Link
            href={"https://concentration-cards.vercel.app/"}
            className="w-1/2 rounded-md"
          >
            <Image
              src={"/images/concentration.png"}
              width={2468}
              height={1188}
              alt="concentration"
              className="rounded-lg border-english-violet border-4"
            ></Image>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href={"https://web-development2-midterm-project.vercel.app/"}
            className="w-1/2 rounded-md"
          >
            <Image
              src={"/images/burger-hut.png"}
              width={2372}
              height={1590}
              alt="concentration"
              className="rounded-lg border-english-violet border-4"
            ></Image>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href={"https://dig-game.vercel.app/"}
            className="w-1/2 rounded-md"
          >
            <Image
              src={"/images/dig-game.png"}
              width={1590}
              height={1192}
              alt="concentration"
              className="rounded-lg border-english-violet border-4"
            ></Image>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href={"https://bopomofo-typer.vercel.app/"}
            className="w-1/2 rounded-md"
          >
            <Image
              src={"/images/bopomofo-typer.png"}
              width={1694}
              height={1274}
              alt="concentration"
              className="rounded-lg border-english-violet border-4"
            ></Image>
          </Link>
        </div>
        <AnimatePresence>
          {isRizardShown && (
            <motion.div
              initial={{ y: "40px" }}
              animate={{ y: "0px" }}
              exit={{ y: "40px" }}
              className={`absolute left-52 top-40`}
            >
              <Image
                src={"/images/rizard.svg"}
                width={50}
                height={50}
                alt="rizard"
              ></Image>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default GalleryPage;
