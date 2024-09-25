import { Outlet } from "react-router-dom";
import Wallpaper from "./layout/Wallpaper";
import UserSidebar from "./layout/UserSidebar";


export default function App() {
  return (
    <div className="flex flex-row w-full h-screen">
      <Wallpaper />
      <div className="w-[10vh] h-screen sidebar">
        <UserSidebar />
      </div>
      <div className="flex w-[80vw] h-[80vh] bg-slate-800 p-10 ml-[15vw] mt-[10vh] z-10">
      <Outlet></Outlet>
      </div>
    </div>
  )
}
