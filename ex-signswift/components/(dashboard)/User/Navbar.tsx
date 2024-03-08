"use client";
import * as React from "react";
import { ComboboxDemo } from "./CombBox";

const Navbar = () => {
  return (
    <nav>
      <div className="flex p-3 bg-gray-800">
        <div className="flex-1 text-white text-3xl ml-20">SignSwift</div>
        <div className="mr-8">
          <ComboboxDemo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
