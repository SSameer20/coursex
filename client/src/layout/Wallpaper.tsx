import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import "../styles/wallpaper.css";

interface ScreenSize {
  width: number;
  height: number;
}

export default function Wallpaper() {
  return (
    <div className="absolute top-0 flex flex-wrap wallpaper h-screen w-full overflow-hidden">
      <div
        className="w-full h-screen"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}
