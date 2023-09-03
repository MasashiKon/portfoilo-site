'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const HomePage = () => {
const [effect, setEffect] = useState(false);

  return (
    <main>
      <section className="flex justify-center items-center h-screen w-screen">
        <div className={`cursor-pointer hover:text-xl active:text-sm select-none transition-{font-size} transition-{line-height} duration-200`} onClick={() => setEffect(!effect)}>
          <h1>Hi, I&apos;m Masashi.</h1>
        </div>
        <Image src={'/cloud1.svg'} width={200} height={200} alt="tete" className={`absolute select-none left-[10%] -top-[200px] origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && 'translate-y-[250px]'}`}/>
        <Image src={'/tree1.svg'} width={200} height={200} alt="tete" className={`absolute select-none -left-[200px] bottom-[5%] origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && 'translate-x-[100px]'}`}/>
        <Image src={'/tree1.svg'} width={200} height={200} alt="tete" className={`absolute select-none -left-[200px] bottom-[10%] origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && 'translate-x-[150px]'}`}/>
        <Image src={'/tree1.svg'} width={200} height={200} alt="tete" className={`absolute select-none left-full bottom-[5%] origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && '-translate-x-[100px]'}`}/>
        <Image src={'/tree1.svg'} width={200} height={200} alt="tete" className={`absolute select-none left-full bottom-[10%] origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && '-translate-x-[150px]'}`}/>
        <Image src={'/deer1.svg'} width={100} height={100} alt="tete" className={`absolute select-none -left-[100px] bottom-[10%] origin-center hover:scale-[120%] active:scale-50 transition-{scale} duration-200 transition-{x} duration-200 ${effect && 'translate-x-[200px]'}`}/>
      </section>
    </main>
  );
};

export default HomePage;
