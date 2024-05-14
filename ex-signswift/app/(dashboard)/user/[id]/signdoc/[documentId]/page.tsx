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
import { useEdgeStore } from "@/lib/edgestore";
// import file from "/Users/tapasviarora/EXSignSwift/ex-signswift/demoooo.pdf";
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
  const { edgestore } = useEdgeStore();
  const params = useParams<{ documentId: string; id: string }>();
  console.log(params.id, params.documentId);
  const signatureCanvasRef = React.useRef<SignatureCanvas | null>(null);
  const [isLast, setIsLast] = React.useState<boolean>(false);
  const [url, setUrl] = React.useState("");
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  // Run only once on component mount
  const signatureCanvasRef2 = React.useRef<SignatureCanvas | null>(null);
  const [copiedItems, setCopiedItems] = React.useState<IField[]>([]);
  const [recipients, setRecipients] = React.useState<any[]>([]);
  const [signNumber, setSignNumber] = React.useState<number>(0);
  const [userx, setUser] = React.useState<User>();

  React.useEffect(() => {
    const cookieData = Cookies.get("session");
    if (cookieData) {
      const jsonData = JSON.parse(cookieData);
      console.log(jsonData);
      setUser(jsonData.data.user);
    } else {
      //redirect to login
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    setEmail(userx?.email || "");
    const getDocument = async () => {
      const response = await axios.post(
        "https://ex-sign-swift.vercel.app/api/document/getDocument",
        {
          docId: params.documentId,
        }
      );
      console.log("step4", response);
      setUrl(response?.data?.Document?.ShareLink);
      const recipientId = response?.data?.Document?.Recipient?.find(
        (user: any) => user.email === user?.email
      ).id;
      const fields = response?.data?.Document?.Field?.filter((item: IField) => {
        return item.recipientId === recipientId;
      });
      //filter out fields for this user only
      setCopiedItems(fields);
      setRecipients(response?.data?.Document?.Recipient);
      setSignNumber(response?.data?.Document?.signnumber);

      console.log("step5", recipients, signNumber);
      if (userx?.id) {
        const user = recipients.find((user) => user.email === userx?.email);

        if (user?.signnumber === recipients?.length - 1) {
          setIsLast(true);
        }
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
              router.push(`https://ex-sign-swift.vercel.app/user/${params.id}`);
            }, 2000);
          }
        }
      }
    };

    getDocument();
  }, [params, signNumber, url]);

  console.log(process.cwd());

  const handleSign = async () => {
    const signDoc = async () => {
      const response = await axios.post(
        "https://ex-sign-swift.vercel.app/api/document/addSignature",
        {
          docId: params.documentId,
          copiedItems: copiedItems,
          isLast: isLast,
          recipientEmail: email,
        }
      );

      console.log(response, "funny");
      if (response.status === 200) {
        // fetch(file).then(async (response) => {
        //   const contentType = response.headers.get("content-type");
        //   const blob = await response.blob();
        //   const file = new File([blob], "filename.pdf");
        //   // access file here
        //   const res = await edgestore.publicFiles.upload({
        //     file: file,
        //     // options: {
        //     //   replaceTargetUrl: response.data.oldurl,
        //     // },
        //   });
        //   console.log("File uploaded successfully:", res);
        //   if (res.url) {
        //     const response = await axios.post(
        //       "http://localhost:3000/api/document/updatedocumentlink",
        //       {
        //         id: params.documentId,
        //         link: res.url,
        //       }
        //     );
        //     console.log(response);
        //   }
        // });
      }

      router.push(`/`);
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
          className="rounded-md h-full  w-full max-w-[40rem]"
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
        <div className="w-[30rem]  h-full mb-10 flex  items-start pt-10 ">
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
