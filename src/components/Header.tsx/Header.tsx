"use client";

import { useDispatch } from "react-redux";
import { HiOutlineSearchCircle } from "react-icons/hi";

import { removeItem } from "@/redux/reducers/localStrageSlice";
import { LocalStrageValue } from "@/localStrage/localStrageValues";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="absolute h-20 w-screen z-10 flex justify-between items-center p-5 pt-10">
      <div>
        <p>Header</p>{" "}
        <button
          onClick={() => dispatch(removeItem(LocalStrageValue.is_started))}
        >
          reset
        </button>
      </div>
      <div>
        <button className="rounded-full bg-olivine w-20 h-20 hover:bg-yellow-green active:shadow-[inset_5px_5px_8px_8px_rgba(0,0,0,0.3)] transition-colors duration-300">
          <HiOutlineSearchCircle className="w-20 h-20 active:scale-95"/>
        </button>
      </div>
    </div>
  );
}

export default Header;
