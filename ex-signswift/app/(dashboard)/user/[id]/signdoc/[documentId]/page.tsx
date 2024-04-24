//sign doc route should be seend by email only
"use client";
import PdfFillComponent from "@/components/DragDrop/pdfFillComponent";
import SignatureForm from "@/components/Form/signatureForm";
import { useParams } from "next/navigation";
import axios from "axios";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { ReactNode } from "react";
import { useEffect } from "react";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";

interface IField {
  id: number;
  secondaaryId: string;
  left: string;
  top: string;
  width: string;
  height: string;
  page: number;
  text: string;
  icon: string;
  recipientId: string;
}
const page = ({ params }: { params: { id: string; documentId: string } }) => {
  const signatureCanvasRef = React.useRef<SignatureCanvas | null>(null);
  const [url, setUrl] = React.useState("");
  const signatureCanvasRef2 = React.useRef<SignatureCanvas | null>(null);
  const [copiedItems, setCopiedItems] = React.useState<IField[]>([]);

  useEffect(() => {
    const getDocument = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/document/getDocument",
        {
          docId: params.documentId,
        }
      );
      console.log("step4", response);

      setUrl(response?.data?.Document?.ShareLink);
      setCopiedItems(response?.data?.Document?.Field);
    };
    getDocument();
  }, [params]);
  const handleSign = () => {
    const signDoc = async () => {
      await axios.post("http://localhost:3000/api/document/addSignature", {
        docId: params.documentId,
        copiedItems: copiedItems,
      });
    };
    signDoc();
  };

  return (
    <div
      className="w-full flex flex-col  items-center px-16"
      style={{
        overflowY: "hidden",
        height: "100%",
      }}
    >
      <div className="w-full flex flex-col gap-7 pt-10 ">
        <H2>{"Pdf_file_name"}</H2>
        <H4>Recepient info</H4>
      </div>
      <div className="flex flex-row w-full  gap-36">
        <div
          className="rounded-md   h-[55rem] w-[40rem]"
          style={{
            display: "flex",
            padding: "1rem",
          }}
        >
          <PdfFillComponent
            url={url}
            copiedItems={copiedItems}
            signatureCanvasRef={signatureCanvasRef}
            signatureCanvasRef2={signatureCanvasRef2}
            userid={params.id}
          />
        </div>
        <div className="w-[30rem] h-[50rem]  flex  items-start pt-10 ">
          <SignatureForm
            signatureCanvasRef={signatureCanvasRef2}
            handleSign={handleSign}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
