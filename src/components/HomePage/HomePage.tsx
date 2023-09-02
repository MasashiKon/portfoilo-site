'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const HomePage = () => {
const [effect, setEffect] = useState(false);

  return (
    <main>
      <section className="flex justify-center items-center h-screen w-screen bg-cyan-400">
        <div className={`cursor-pointer hover:text-xl active:text-sm select-none transition-{font-size} transition-{line-height} duration-200`} onClick={() => setEffect(true)}>
          <h1>Hi, I&apos;m Masashi.</h1>
        </div>
        <Image src={'/k0755_1.svg'} width={200} height={200} alt="tete" className={`absolute -left-96 top-96 origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && 'translate-x-80'}`}/>
      </section>
    </main>
  );
};

export default HomePage;
