import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Routes } from "./types"; 

export default function UserSidebar() {
    const navigate = useNavigate();
  return (
    <div className="w-[10vw] h-screen flex flex-col gap-10 justify-center items-start ml-10 z-10">
        <Button className="text-[25px] hover:px-5 hover:py-5" onClick={()=>navigate(Routes.DASHBOARD)}>Dashboard</Button>
        <Button className="text-[25px] hover:px-5 hover:py-5" onClick={()=>navigate(Routes.COURSE)}>My Courses</Button>
        <Button className="text-[25px] hover:px-5 hover:py-5" onClick={()=>navigate(Routes.PROFILE)}>Profile</Button>
    </div>
  )
}
