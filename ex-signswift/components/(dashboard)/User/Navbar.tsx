"use client";
import * as React from "react";
import { ComboboxDemo } from "./CombBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";
import logo from "@/public/Profile.png"
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="nav-container">
      <div className=" nav-container-two flex items-center ">
        {/* <div className=" nav-container-three w-full flex flex-row justify-between  "> */}
          <div className="nav-Logo-section w-1/2  gap-20">
            <H2>SignSwift</H2>
            <H4>Documents</H4>
          </div>
          <div className=" nav-profile">
            <Image className="profile-icon-image" src={logo} alt="logo" />
            {/* <p>Profile Icon</p> */}
          </div>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
