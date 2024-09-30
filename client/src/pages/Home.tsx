import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Wallpaper from "../layout/Wallpaper";
import "../styles/home.css";

import { motion } from "framer-motion";
import { Routes } from "../layout/types";
import { validateJWT } from "../layout/Validate.JWT";

export default function Home() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<number>(window.innerWidth);
  // const environment = process.env.ENVIRONMENT;
  // console.log("Environment is " + environment);

  const handleLearn = (): any => {
    const token = localStorage.getItem("token");
    const isValid = validateJWT(token);
    if (isValid) {
      return navigate(Routes.APP);
    } else {
      localStorage.removeItem("token");
      return navigate(Routes.AUTH);
    }
  };

  const handleResize = () => {
    setScreen(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);

  return (
    <div className="flex flex-col w-full h-screen items-center overflow-hidden home relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-5 right-5 z-10"
      >
        <Button color="secondary" onClick={() => navigate(Routes.AUTH)}>
          Login
        </Button>
      </motion.div>

      <div className="relative top-[100vh] w-[30vw] h-[30vw] flare z-0"></div>
      <div className="relative bottom-[90vh] w-[30vw] h-[30vw] flare z-0"></div>

      <motion.span
        className="z-10 font-bold"
        style={{
          fontSize:
            window.innerWidth >= 768
              ? "8vw"
              : window.innerWidth >= 500
              ? "10vw"
              : "15vw",
        }}
        initial={{
          opacity: 0,
          y:
            window.innerWidth >= 768
              ? -300
              : window.innerWidth >= 500
              ? -200
              : 40,
        }}
        animate={{
          opacity: 1,
          y:
            window.innerWidth >= 768
              ? -400
              : window.innerWidth >= 500
              ? -300
              : -10,
        }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        COURSEX
      </motion.span>
      <motion.div
        style={{
          height: "30vh",
          width: window.innerWidth >= 768 ? "50vw" : "90vw",
        }}
        initial={{
          opacity: 0,
          y:
            window.innerWidth >= 700
              ? -50
              : window.innerWidth >= 500
              ? -50
              : 20,
        }}
        animate={{
          opacity: 1,
          y:
            window.innerWidth >= 700
              ? -100
              : window.innerWidth >= 500
              ? -100
              : -50,
        }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute top-[60vh] w-2/3 h-[20vh] z-10 flex flex-col gap-5 items-center"
      >
        <span className="text-center w-3/4">
          Modern web application designed to provide a platform for instructors
          to sell online courses and for students to learn and purchase.
        </span>
        <Button color="primary" className="z-3 w-1/3" onClick={handleLearn}>
          Learn
        </Button>
      </motion.div>

      <motion.span
        className="absolute bottom-5 z-10"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 10,
        }}
        transition={{ delay: 1, duration: 1 }}
      >
        Made with Love by{" "}
        <a href="https://github.com/SSameer20" target="_blank">
          Sameer
        </a>
      </motion.span>

      <Wallpaper />
    </div>
  );
}
