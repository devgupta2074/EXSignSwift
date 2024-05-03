"use client";
import * as React from "react";
import { ComboboxDemo } from "./CombBox";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";
import logo from "@/public/Profile.png";
import logo1 from "../../../assets/image.png";
import Image from "next/image";
import { FaPenNib } from "react-icons/fa";
import { Link } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = (props: any) => {
  const router = useRouter();

  // redirect(`/api/auth/signout`)   wont't work because this is client component it would have worked in server side componenet
  function handleSignOut() {
    console.log("signout click");
    router.push("/api/auth/signout");
    // redirect(`/api/auth/signout`)   wont't work because this is client component it would have worked in server side componenet
  }
  return (
    <nav className="nav-container bg-white">
      <div className="px-12 py-3   nav-container-two flex items-center bg-white text-black">
        {/* <div className=" nav-container-three w-full flex flex-row justify-between  "> */}
        <div className="nav-Logo-section  flex items-center w-1/2  gap-5 text-black">
          <Image width={"30"} height={"30"} src={logo1} alt="logo" />
          <H2>
            <div className="text-[#0F172A]">SignSwift</div>
          </H2>
          {/* <H4>Documents</H4> */}
        </div>
        <div className="nav-profile">
          {/* <Image className="profile-icon-image" src={logo} alt="logo" /> */}
          <a href="/">
            <Image className="profile-icon-image" src={logo} alt="logo" />
          </a>
          {/* <p>Profile Icon</p> */}
          <div className="user-data-logo">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex  gap-5  justify-start items-center flex-col text-sm">
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col items-start justify-start">
                    <p>{props.user.name}</p>
                    <p>Personal Account</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p
                      style={{
                        marginBottom: "-8px",
                        width: "20px",
                        color: "#64748B",
                      }}
                    >
                      ^
                    </p>
                    <p
                      className="rotate-180"
                      style={{
                        marginTop: "-8px",
                        width: "20px",
                        color: "#64748B",
                      }}
                    >
                      ^
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>SignOut</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div></div>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
