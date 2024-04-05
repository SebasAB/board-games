"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import { GiCardJoker } from "react-icons/gi";
import { PiKnifeBold } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";
import { SidebarItem } from "./SidebarItem";

const menuItems = [
  {
    path: "/board-games/cabo",
    icon: <TbCardsFilled size={40} />,
    title: "Cabo",
    subTitle: "Enter players and start the game",
  },
  {
    path: "/board-games/telefunken",
    icon: <GiCardJoker size={40} />,
    title: "Telefunken",
    subTitle: "Enter players and start registering scores",
  },
  {
    path: "/board-games/clue",
    icon: <PiKnifeBold size={40} />,
    title: "Cluedo",
    subTitle: "Register your cards",
  },
];

export const Sidebar = () => {
  // State to manage sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="p-4 md:hidden z-20 fixed top-0 right-0"
        onClick={() => {
          console.log("clicked toggle menu", isOpen ? "close" : "open");
          setIsOpen(!isOpen);
          console.log("clicked toggle menu", isOpen ? "close" : "open");
        }}
      >
        {/* Toggle Icon or Text */}
        Menu
      </button>

      {/* Sidebar */}
      <div
        id="menu"
        className={`bg-gray-900 min-h-screen z-10 text-slate-300 md:w-64 w-full absolute md:relative transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-scroll transition-transform duration-300 ease-in-out`}
      >
        <div id="logo" className="my-4 px-6">
          <Link href="/">
            <h1 className="text-lg md:text-2xl font-bold text-white">
              Board<span className="text-blue-500">Games</span>
            </h1>
          </Link>
          <p className="text-slate-500 text-sm">Register your scores</p>
        </div>
        <div id="nav" className="w-full px-6">
          {menuItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};
