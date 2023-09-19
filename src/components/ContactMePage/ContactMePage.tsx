"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

import { setHasWateringCan } from "@/redux/reducers/localStrageSlice";
import { RootState } from "@/redux/store";
import { playGetSound, playSoundCorrect } from "@/utils/playSound";
import { setIsPuzzle4Met } from "@/redux/reducers/puzzleSlice";
import {
  setIsPuzzle4Done,
  incrementFound,
} from "@/redux/reducers/localStrageSlice";

const ContactMePage = () => {
  const router = useRouter();
  const hasWateringCan = useSelector((state: RootState) => {
    return state.localStorage.hasWateringCan;
  });
  const isPuzzle4Done = useSelector((state: RootState) => {
    return state.localStorage.isPuzzle4Done;
  });
  const isTutorialDone = useSelector((state: RootState) => {
    return state.localStorage.isTutorialDone;
  });
  const isMute = useSelector((state: RootState) => {
    return state.localStorage.isMute;
  });
  const [textareaRows, setTextareaRows] = useState(5);
  const [isValidForm, setIsValidForm] = useState(false);

  const dispatch = useDispatch();

  const form = useRef(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isTutorialDone) {
      router.push("/");
    }
  });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_qnbzdph",
        "template_vynvtxh",
        form.current,
        "aYZSl6EbX56GwP8tD"
      )
      .then((result) => {
        toast.success("Email sent successfully.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (!isPuzzle4Done) {
          if (!isMute) {
            playSoundCorrect();
          }
          dispatch(setIsPuzzle4Done(true));
          setTimeout(() => {
            dispatch(incrementFound(null));
          }, 500);
        }
      })
      .catch(() => {
        toast.error("Sorry, sent failed. Please try later.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setIsValidForm(false);
        if (!nameInput.current || !emailInput.current || !messageInput.current)
          return;
        nameInput.current.value = "";
        emailInput.current.value = "";
        messageInput.current.value = "";
      });
  };

  const handleFormValidity = () => {
    if (!nameInput.current || !emailInput.current || !messageInput.current)
      return;
    const validName = nameInput.current.validity.valid;
    const validEmail = emailInput.current.validity.valid;
    const validMessage = messageInput.current.validity.valid;

    if (validName && validEmail && validMessage) {
      dispatch(setIsPuzzle4Met(true));
      setIsValidForm(true);
    } else {
      dispatch(setIsPuzzle4Met(false));
      setIsValidForm(false);
    }
  };

  return (
    <>
      <div className="pt-28 h-screen w-screen grid place-content-center">
        <ToastContainer />
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col items-center"
        >
          <label className="flex flex-col items-center select-none">
            Your Name
            <input
              type="text"
              name="user_name"
              className="border-4 rounded-md border-dim-gray mt-2 w-60 transition-colors duration-200 valid:border-yellow-green focus:outline-olivine"
              ref={nameInput}
              required
              onChange={handleFormValidity}
            />
          </label>
          <label className="flex flex-col items-center mt-2 select-none">
            Email
            <input
              type="email"
              name="user_email"
              className="border-4 rounded-md border-dim-gray mt-2 w-60 transition-colors duration-200 valid:border-yellow-green focus:outline-olivine"
              ref={emailInput}
              required
              onChange={handleFormValidity}
            />
          </label>
          <label
            className="flex flex-col items-center mt-2 select-none"
            onClick={(e) => {
              e.preventDefault();
              // setTextareaRows((pre) => (pre + 1) % 15);
            }}
            htmlFor="textarea"
          >
            Message
          </label>
          <textarea
            name="message"
            className="border-4 rounded-md border-dim-gray mt-2 w-60 resize-none transition-colors duration-200 valid:border-yellow-green focus:outline-olivine"
            rows={textareaRows}
            ref={messageInput}
            id="textarea"
            required
            onChange={handleFormValidity}
          />
          <motion.input
            type="submit"
            value="Send"
            className={`border-4 rounded-md border-dim-gray w-1/2 mt-2 cursor-pointer transition-colors duration-200 ${
              isValidForm && "border-yellow-green"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </form>
      </div>
      {!hasWateringCan && (
        <div
          className={`fixed bottom-10 left-10 opacity-0 ${
            !hasWateringCan && hasWateringCan !== null && "opacity-100"
          }`}
          onClick={() => {
            if (!isMute) {
              playGetSound();
            }
            dispatch(setHasWateringCan(true));
          }}
        >
          <Image
            src={"/images/watering-can.svg"}
            alt="watring can"
            width={100}
            height={100}
          ></Image>
        </div>
      )}
    </>
  );
};

export default ContactMePage;
