"use client";
import * as React from "react";
import { ComboboxDemo } from "./CombBox";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";
import logo from "@/public/Profile.png"
import Image from "next/image";
import { FaPenNib } from "react-icons/fa";
import { Link } from "lucide-react";

const Navbar = (props:any) => {
  const router = useRouter();

  function handleSignOut(){    
      console.log("signout click")
      router.push('/api/auth/signout');
      // redirect(`/api/auth/signout`)   wont't work because this is client component it would have worked in server side componenet                 
                
  }
  return (
    <nav className="nav-container">
      <div className=" nav-container-two flex items-center ">
        {/* <div className=" nav-container-three w-full flex flex-row justify-between  "> */}
          <div className="nav-Logo-section w-1/2  gap-20">
            <H2> <FaPenNib/>SignSwift</H2>
            {/* <H4>Documents</H4> */}
          </div>
          <div className="nav-profile">
            {/* <Image className="profile-icon-image" src={logo} alt="logo" /> */}
            <a href="/">
        <Image className="profile-icon-image" src={logo} alt="logo" />
    </a>
            {/* <p>Profile Icon</p> */}
            <div className="user-data-logo">

            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            
            </div>
            <button className="signout-btn" onClick={handleSignOut}>
                          Sign Out
                          </button>
          </div>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
