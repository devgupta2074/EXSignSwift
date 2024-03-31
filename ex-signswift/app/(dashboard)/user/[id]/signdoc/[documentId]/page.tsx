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

interface DroppedItem {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  pageNumber: number;
  text: string;
  icon: ReactNode;
  user: string;
}
const page = () => {
  const signatureCanvasRef = React.useRef<SignatureCanvas | null>(null);
  const signatureCanvasRef2 = React.useRef<SignatureCanvas | null>(null);
  const { documentId } = useParams();
  const [copiedItems, setCopiedItems] = React.useState<DroppedItem[]>([]);

  useEffect(() => {
    const getDocument = async () => {
      const data = {
        docId: documentId,
      };
      const response = await axios.post(
        "http://localhost:3000/api/document/getDocument",
        data
      );
      //   console.log(response);

      const transformedFields = response.data.Document.Field;

      const newField = transformedFields.map((field: any) => {
        return {
          id: field.secondaryId,
          left: parseInt(field.left),
          top: parseInt(field.top),
          width: parseInt(field.width),
          height: parseInt(field.height),
          pageNumber: field.page,
          text: field.text,
          user: field.recipientId.toString(),
        };
      });
      setCopiedItems(newField);

      //   setCopiedItems(transformedFields);
    };
    getDocument();
  }, []);

  return (
    <div
      className="w-full flex flex-row justify-center items-center  bg-gray-800 pt-5"
      style={{
        overflowY: "hidden",
        height: "100%",
      }}
    >
      <div
        className="w-1/2 h-full"
        style={{
          overflowY: "hidden",

          display: "flex",
          padding: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PdfFillComponent
          copiedItems={copiedItems}
          signatureCanvasRef={signatureCanvasRef}
          signatureCanvasRef2={signatureCanvasRef2}
        />
      </div>
      <div className="w-1/2 flex justify-center items-start pt-10 h-full">
        <div className=" w-3/4">
          <SignatureForm signatureCanvasRef={signatureCanvasRef2} />
        </div>
      </div>
    </div>
  );
};

export default page;
