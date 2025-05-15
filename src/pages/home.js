import React from "react";
import { SideBar } from "../components/sidebar";

export default function Home() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex py-[19px]">
        <SideBar />
      </div>
    </div>
  );
}
