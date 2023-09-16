"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setHasWateringCan } from "@/redux/reducers/localStrageSlice";
import { RootState } from "@/redux/store";
import { playGetSound } from "@/utils/playSound";

const ContactMePage = () => {
  const hasWateringCan = useSelector((state: RootState) => {
    return state.localStorage.hasWateringCan;
  });

  const dispatch = useDispatch();

  const form = useRef(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

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
        if (!nameInput.current || !emailInput.current || !messageInput.current)
          return;
        nameInput.current.value = "";
        emailInput.current.value = "";
        messageInput.current.value = "";
      });
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
          <label className="flex flex-col items-center">
            Your Name
            <input
              type="text"
              name="user_name"
              className="border-4 rounded-md border-dim-gray mt-2 w-60"
              ref={nameInput}
            />
          </label>
          <label className="flex flex-col items-center mt-2">
            Email
            <input
              type="email"
              name="user_email"
              className="border-4 rounded-md border-dim-gray mt-2 w-60"
              ref={emailInput}
            />
          </label>
          <label className="flex flex-col items-center mt-2">
            Message
            <textarea
              name="message"
              className="border-4 rounded-md border-dim-gray mt-2 w-60"
              rows={5}
              ref={messageInput}
            />
          </label>
          <motion.input
            type="submit"
            value="Send"
            className="border-4 rounded-md border-dim-gray w-1/2 mt-2 cursor-pointer"
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
            playGetSound();
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
