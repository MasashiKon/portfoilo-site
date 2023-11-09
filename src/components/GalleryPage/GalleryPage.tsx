"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { setIsPuzzle2Met, setIsPuzzle5Met } from "@/redux/reducers/puzzleSlice";
import { RootState } from "@/redux/store";
import { Theme } from "@/types/localStrageValues";
import { generateDungen } from "@/utils/generateDungeon";
import Gallery1 from "./Gallery1/Gallery1";
import Gallery2 from "./Gallery2/Gallery2";

const GalleryPage = () => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.localStorage.theme);
  const isTutorialDone = useSelector(
    (state: RootState) => state.localStorage.isTutorialDone
  );

  useEffect(() => {
    if (!isTutorialDone) {
      router.push("/");
    }
  });

  return (
    <main
      className={`transition-colors duration-200 relative ${
        theme === Theme.light
          ? "text-dim-gray"
          : "text-english-violet bg-dim-gray"
      }`}
    >
      <Gallery1 />
      <Gallery2 theme={theme} />
    </main>
  );
};

export default GalleryPage;
