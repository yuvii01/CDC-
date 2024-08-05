import React from "react";
import SideBar from "../../Components/Adminn/SideBar";
import Header from "../../Components/Adminn/Header";
import { Outlet } from "react-router-dom";
import Slider from "../../Components/Website/Slider";

function Main() {
  return (
    <div className=" md:flex bg-[#61677A]">
      <SideBar />
      <Header />
      <Outlet />
    </div>
  );
}

export default Main;
