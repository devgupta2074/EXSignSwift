"use client";
import PdfFillComponent from "@/components/DragDrop/pdfFillComponent";
import SignatureForm from "@/components/Form/signatureForm";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import EmailForm from "@/components/emailForm";
import PdfViewer from "@/components/PdfViewer/viewer";

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
  const signatureCanvasRef2 = React.useRef<SignatureCanvas | null>(null);
  const [url, setUrl] = React.useState("");
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

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center items-center"></div>
      <div
        className="w-full flex flex-row justify-center items-center  space-x-10   bg-gray-800 pt-5"
        style={{ overflowY: "hidden", height: "86vh" }}
      >
        <div
          style={{
            overflowY: "hidden",
            overflowX: "hidden",
            height: "100%",
          }}
          id="pdf-viewer"
          className="h-full w-1/2"
        >
          <PdfViewer copiedItems={copiedItems} url={url} />
        </div>
        <div className=" justify-center pt-0 h-full ">
          <div className="w-full h-full">
            <EmailForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
