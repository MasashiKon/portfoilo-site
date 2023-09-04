"use client";

import { useDispatch } from "react-redux";

import { removeItem } from "@/redux/reducers/localStrageSlice";
import { LocalStrageValue } from "@/localStrage/localStrageValues";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="absolute z-10">
      <p>Header</p>
      <button onClick={() => dispatch(removeItem(LocalStrageValue.is_started))}>
        reset
      </button>
    </div>
  );
}

export default Header;
