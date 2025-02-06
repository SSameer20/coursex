import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import AppGif from "../../assets/application.mp4";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

// import

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 5, // max tilt rotation (degrees)
  perspective: 500, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

export default function Home() {
  const [screen, setScreen] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  window.addEventListener("resize", () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
  useEffect(() => {}, [window.innerWidth]);

  const line: string =
    "CourseX is a modern web application designed to provide a platform for instructors to sell online courses";

  return (
    <div
      className="relative w-full overflow-y-auto overflow-x-hidden"
      style={{
        height: "100vh",
      }}
    >
      <div
        className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-center items-center"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      >
        <motion.div
          className="absolute top-5 right-5"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Button color="primary">Login</Button>
        </motion.div>
        <div
          className="absolute h-[1px] w-[1px] top-[-10vh]"
          style={{
            boxShadow: "0 0 600px 150px purple ",
          }}
        />

        <motion.p
          className="text-[100px] font-bold font-sans"
          initial={{
            y: 50,
            opacity: 0,
          }}
          animate={{ y: -50, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          COURSEX
        </motion.p>

        <motion.p
          className="text-[20px] w-[40%] font-sans"
          style={{ textAlign: "center" }}
          initial={{
            y: 70,
            opacity: 0,
          }}
          animate={{ y: -30, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {line}
        </motion.p>
        <motion.div
          initial={{
            y: 110,
            opacity: 0,
          }}
          animate={{ y: -10, opacity: 1 }}
          transition={{ duration: 2, delay: 0.75 }}
        >
          <Button color="primary">Learn</Button>
        </motion.div>
      </div>
      <div className="w-full h-[90vh] flex justify-center">
        <Tilt
          options={defaultOptions}
          style={{ height: "70vh", width: "70vw" }}
        >
          <video
            className="z-1"
            src={AppGif}
            style={{
              height: "80vh",
              width: "70vw",
            }}
          />
        </Tilt>
      </div>
    </div>
  );
}
