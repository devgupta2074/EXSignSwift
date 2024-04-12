"use client";
import * as React from "react";
import { ComboboxDemo } from "./CombBox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav>
      <div className="flex p-3 bg-gray-800">
        <div className="flex-1 text-white text-3xl ml-20">SignSwift</div>
        <div className="mr-8">
          <Button
            onClick={() => router.push("/api/auth/signout")}
            variant="destructive"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
