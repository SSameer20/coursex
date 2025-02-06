import { Avatar } from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "./types";
// import { validateJWT } from "./Validate.JWT";

const PopCard = () => {
  const navigate = useNavigate();
  const handleLog = () => {
    localStorage.removeItem("token");
    return navigate(Routes.AUTH);
  };
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          size="md"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <Button className="text-small font-bold" onClick={handleLog}>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function Navigation() {
  return (
    <div
      className="absolute w-full h-[10vh] flex flex-row items-center justify-between pr-[10vw] pl-[2vw]"
      style={{
        backgroundColor: "transparent",
        borderBottom: "solid 0.1px rgba(255,255,255, 0.3)",
      }}
    >
      <span className="text-3xl font-bold">COURSEX</span>
      <PopCard />
    </div>
  );
}
