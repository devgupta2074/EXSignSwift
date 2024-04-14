"use client";
import PdfFillComponent from "@/components/DragDrop/pdfFillComponent";
import SignatureForm from "@/components/Form/signatureForm";
import PdfViewer from "@/components/PdfViewer/viewer";
import Step2 from "@/components/Step2";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
const page = ({ params }: { params: { id: string; documentId: string } }) => {
  const [title, setTitle] = React.useState<string>("");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const getDocument = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/document/getDocument",
        {
          docId: params.documentId,
        }
      );
      setTitle(response?.data?.Document?.title);
      setUrl(response?.data?.Document?.ShareLink);
    };
    getDocument();
  }, [params]);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center items-center">
        <h1 className="scroll-m-20 text-white text-2xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
      </div>
      <div
        className="step-two-container flex justify-center items-center  bg-gray-800 pt-5"
        // style={{ overflowY: "hidden", height: "86vh" }}
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
          <PdfViewer url={url} />
        </div>
        <div className="step-two-form justify-center pt-0  ">
          <div className="w-full h-full">
            <Step2 docId={params.documentId} userId={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
