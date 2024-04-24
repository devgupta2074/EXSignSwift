"use client";
import * as React from "react";
import { ComboboxDemo } from "./CombBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav>
      <div className="flex p-3 items-center px-16 mt-5">
        <div className="w-full flex flex-row justify-between  items-center  ">
          <div className="w-1/2 flex items-center gap-20">
            <H2>SignSwift</H2>
            <H4>Documents</H4>
          </div>
          <div className="flex items-center justify-center">Profile Icon</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
