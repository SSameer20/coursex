import { Outlet } from "react-router-dom";
import UserSidebar from "../../layout/UserSidebar";

export default function Admin() {
  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      <div className="w-[10vh] h-screen sidebar">
        <UserSidebar />
      </div>
      <div className="flex w-[80vw] h-[80vh] ml-[18vw] mt-[10vh] z-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
