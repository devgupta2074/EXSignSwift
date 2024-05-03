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
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Cookies from "js-cookie";
import { User } from "@prisma/client";

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
const page = () => {
  const params = useParams<{ documentId: string; id: string }>();
  console.log(params.id, params.documentId);
  const signatureCanvasRef = React.useRef<SignatureCanvas | null>(null);
  const [url, setUrl] = React.useState("");
  const router = useRouter();
  // Run only once on component mount
  const signatureCanvasRef2 = React.useRef<SignatureCanvas | null>(null);
  const [copiedItems, setCopiedItems] = React.useState<IField[]>([]);
  const [recipients, setRecpients] = React.useState<any[]>([]);
  const [signNumber, setSignNumber] = React.useState<number>(0);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const cookieData = Cookies.get("session");
    if (cookieData) {
      const jsonData = JSON.parse(cookieData);
      console.log(jsonData);
      setUser(jsonData.data.user);
    } else {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    const getDocument = async () => {
      const response = await axios.post(
        "https://ex-sign-swift.vercel.app/api/document/getDocument",
        {
          docId: params.documentId,
        }
      );
      console.log("step4", response);
      setUrl(response?.data?.Document?.ShareLink);
      setCopiedItems(response?.data?.Document?.Field);
      setRecpients(response?.data?.Document?.Recipient);
      setSignNumber(response?.data?.Document?.signnumber);
      console.log("step5", recipients, signNumber);
      if (user?.id) {
        const user = recipients.find((user) => user.email === user?.email);
        console.log("step6", user);
        if (user) {
          if (user.signnumber !== signNumber) {
            console.log("333");
            toast(
              "Currently you are not allowed to sign Wait for your number to come to sign the doc. Redirecting",
              {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              }
            );
            setTimeout(() => {
              router.push(`https://ex-sign-swift.vercel.app/user/${user?.id}`);
            }, 2000);
          }
        }
      }
    };

    getDocument();
  }, [params, signNumber, url]);

  const handleSign = () => {
    const signDoc = async () => {
      await axios.post(
        "https://ex-sign-swift.vercel.app/api/document/addSignature",
        {
          docId: params.documentId,
          copiedItems: copiedItems,
        }
      );
      router.push(`/sendSuccess`);
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
      <ToastContainer />
      <div className="w-full flex flex-col gap-7 pt-10 ">
        <H2>{"Pdf_file_name"}</H2>
        <H4>Recepient info</H4>
      </div>
      <div className="flex flex-row w-full  gap-36">
        <div
          className="rounded-md h-full w-[40rem]"
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
        <div className="w-[30rem] h-full mb-10 flex  items-start pt-10 ">
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
