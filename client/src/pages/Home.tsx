import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Wallpaper from "../layout/Wallpaper";
import "../styles/home.css";

import { Routes } from "../layout/types";
import { validateJWT } from "../layout/Validate.JWT";

export default function Home() {
  const navigate = useNavigate();

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
  return (
    <div className="flex flex-col w-full h-screen items-center overflow-hidden home">
      <Button
        color="secondary"
        className="absolute top-5 right-5 z-10"
        onClick={() => navigate(Routes.AUTH)}
      >
        Login
      </Button>

      <span className="z-10 font-bold title">COURSEX</span>
      <div className="absolute top-[50vh] w-1/4 z-10 flex flex-col gap-5 description">
        <span>
          CourseX is a modern web application designed to provide a platform for
          instructors to sell online courses and for students to purchase and
          learn from them.
        </span>
        <Button color="primary" onClick={handleLearn}>
          Learn
        </Button>
      </div>
      <Wallpaper />
    </div>
  );
}
