"use client";
import PdfFillComponent from "@/components/DragDrop/pdfFillComponent";
import React from "react";

const page = () => {
  return (
    <div
      className="w-full flex flex-row  space-x-10 items-center pt-0 "
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      <PdfFillComponent />
    </div>
  );
};

export default page;
