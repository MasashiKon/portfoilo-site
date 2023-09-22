import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const Menu = ({
  isPuzzle1Done,
  hasItem,
  isItemWindowOpen,
  setIsItemWindowOpen,
}: {
  isPuzzle1Done: boolean | null;
  hasItem: boolean | null;
  isItemWindowOpen: boolean;
  setIsItemWindowOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.ul
      initial={{ y: "-100px" }}
      animate={{ y: "0px" }}
      className="w-full justify-evenly items-center flex overflow-scroll"
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
  );
};

export default Menu;
