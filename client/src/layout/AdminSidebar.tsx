// import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Routes } from "./types";

export default function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <div
      className="w-[15vw] h-screen flex flex-col gap-10 justify-start items-start pl-5 pt-[15vh] z-10"
      style={{ backgroundColor: "#0B192C" }}
    >
      <span
        className="text-[25px] z-10 cursor-pointer"
        onClick={() => navigate(Routes.ADMIN_DASHBOARD)}
      >
        Dashboard
      </span>
      <span
        className="text-[25px] z-10 cursor-pointer"
        onClick={() => navigate(Routes.ADMIN_COURSE)}
      >
        My Courses
      </span>
      <span
        className="text-[25px] z-10 cursor-pointer"
        onClick={() => navigate(Routes.ADMIN_PROFILE)}
      >
        Profile
      </span>
    </div>
  );
}
