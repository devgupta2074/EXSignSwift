"use client";
import PdfFillComponent from "@/components/DragDrop/pdfFillComponent";
import SignatureForm from "@/components/Form/signatureForm";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
const page = () => {
  const signatureCanvasRef = React.useRef<SignatureCanvas | null>(null);
  const signatureCanvasRef2 = React.useRef<SignatureCanvas | null>(null);

  return (
    <div
      className="w-full flex flex-row  space-x-10    pt-5"
      style={{ overflowY: "hidden", height: "90vh" }}
    >
      <div
        className="w-1/2 h-full border-2 border-red"
        style={{ overflowY: "hidden" }}
      >
        <PdfFillComponent
          signatureCanvasRef={signatureCanvasRef}
          signatureCanvasRef2={signatureCanvasRef2}
        />
      </div>
      <div className="w-1/2 flex justify-center items-start pt-0">
        <div className="w-3/5">
          <SignatureForm signatureCanvasRef={signatureCanvasRef2} />
        </div>
      </div>
    </div>
  );
};

export default page;
