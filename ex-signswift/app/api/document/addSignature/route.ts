// function to create user in our database
// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { PDFDocument } from "pdf-lib";
import { signDoc } from "../../../../components/PdfSign/signnn.js";
import fs from "fs";
import path from "path";
import {
  createPresignedUrlToDownload,
  createPresignedUrlToUpload,
} from "@/app/utils/s3-file-management";
import { nanoid } from "nanoid";
import { FileProps, PresignedUrlProp } from "@/app/utils/types";
import { uploadToS3 } from "@/app/utils/fileUploadHelpers";
import axios from "axios";

const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

//update title of document

interface IField {
  id: number;
  secondaryId: string;
  left: string;
  top: string;
  width: string;
  height: string;
  page: number;
  text: string;
  icon: string;
  recipientId: number;
  signature: string;
}
export async function POST(req: NextRequest, res: NextApiResponse) {
  var oldurl = "";
  var pdfbytes4;
  const { docId, copiedItems, isLast, recipientEmail } = await req.json();
  console.log(recipientEmail);
  const document = await prisma.document.findUnique({
    where: {
      id: parseInt(docId),
    },
    include: {
      Field: {
        include: {
          Signature: true,
        },
      },
    },
  });

  let userId = document?.userId;
  console.log("user id is", document?.userId);
  const user2 = await prisma.user.findUnique({
    where: {
      customerId: userId,
    },
  });
  console.log("user id", user2);
  console.log("email is", user2?.email);

  //role recpient->creater ,reader,signer
  //mail will be sent to  all
  // and in case signer when its his step to sign doc

  console.log("check2");
  if (isLast) {
    const signFields = copiedItems.map((item: any) => ({
      fieldId: item.id,
      signatureImageAsBase64: item.signature,
      recipientId: item.recipientId,
    }));
    const signature = await prisma.signature.createMany({
      data: signFields,
    });
    const document2 = await prisma.document.findUnique({
      where: {
        id: parseInt(docId),
      },
      include: {
        Field: {
          include: {
            Signature: true,
          },
        },
      },
    });

    const pdfUrl = document2?.ShareLink || "";
    const addedFields = document2?.Field;
    console.log("added field in last is", addedFields);
    console.log(pdfUrl);
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch PDF file");
    }
    // console.log(response);
    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    addedFields?.map(async (item: any) => {
      if (item?.Signature) {
        const pngImage = await pdfDoc.embedPng(
          item?.Signature?.signatureImageAsBase64
        );
        const page = pdfDoc.getPage(item?.page - 1);
        const height = page?.getHeight();

        page.drawImage(pngImage, {
          x: parseInt(item?.left),
          y: Math.abs(height - parseInt(item?.top) - parseInt(item?.height)),
          width: parseInt(item?.width),
          height: parseInt(item?.height),
        });
      }
    });
    const pdfBytes2 = await pdfDoc.save();
    if (pdfBytes2) {
      pdfbytes4 = pdfBytes2;
      oldurl = pdfUrl;
    }

    console.log(pdfbytes4, oldurl);
    const bucketName = "ipvms-dev";
    const fileName = `${nanoid(5)}_completed_pdf.pdf`;
    const expiry = 60 * 60 * 24 * 7; // 1 year
    const url = await createPresignedUrlToUpload({
      bucketName,
      fileName,
      expiry,
    });
    console.log(url, "presigned url created");
    const blob = new Blob([pdfBytes2], { type: "application/pdf" });
    const file = new File([blob], fileName, {
      type: "application/pdf",
      lastModified: Date.now(),
    });
    console.log(file, "file created");
    const presignedurl: PresignedUrlProp = {
      originalFileName: "name.pdf",
      fileSize: 1212,
      url: url,
      fileNameInBucket: fileName,
    };

    const uploadtos3 = (await uploadToS3(presignedurl, file)).json();
    console.log(uploadtos3, "upload to S3 put");
    const presignedUrltodownload = await createPresignedUrlToDownload({
      bucketName:
        process.env.S3_BUCKET_NAME !== undefined
          ? process.env.S3_BUCKET_NAME
          : "ipvms-dev",
      fileName: fileName,
    });

    console.log(presignedUrltodownload);
    const responseupdate = await axios.post(
      "https://ex-sign-swift.vercel.app/api/document/updatedocumentlink",
      {
        id: docId,
        link: presignedUrltodownload,
      }
    );
    console.log(responseupdate, " update document link");

    // const pdfFilePath =
    //   "C:/Users/dgupta/Desktop/hrtech/EXSignSwift/ex-signswift/components/PdfSign/sow2.pdf";
    // fs.writeFileSync(pdfFilePath, pdfBytes2);
    // console.log(pdfFilePath, "dnddnd");
    // fs.writeFileSync(
    //   "C:/Users/dgupta/Desktop/hrtech/EXSignSwift/ex-signswift/components/PdfSign/sow2.pdf",
    //   pdfBytes2
    // );
    // const res = await edgestore.publicFiles.upload({
    //   file: new File([pdfBytes2], "completed_pdf", { type: "application/pdf" }),
    //   options: {
    //     replaceTargetUrl: pdfUrl,
    //   },
    // });
    // -----------------------important uncomment
    const updatedDocument = await prisma.document.update({
      where: {
        id: parseInt(docId || "0"),
      },
      data: {
        signnumber: {
          increment: 1,
        },
        status: "COMPLETED",
      },
    });

    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: [user2?.email, "guptadev265@gmail.com", "guptadev545@gmail.com"],
      subject: "check_multiple in main",
      // react: <Welcome />
      // html: emailHtml,
      html: `<h3>Your document is signed by all recipients</h3> <a href=${presignedUrltodownload}> Download The Signed Document</a>`,
      // attachments: [
      //   {
      //     filename: document?.title,
      //     content: pdfBytes,
      //     contentType: "application/pdf",
      //   },
      // ],
    };
    await transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        // console.log(check3)
        console.log(error);
      } else {
        console.log("Email sent successfully!");
        return NextResponse.json({
          message: "data",
          pdf: pdfBytes2,
          oldurl: pdfUrl,
        });
      }
    });
  } else {
    const signFields = copiedItems.map((item: any) => ({
      fieldId: item.id,
      signatureImageAsBase64: item.signature,
      recipientId: item.recipientId,
    }));

    const signature = await prisma.signature.createMany({
      data: signFields,
    });
    var mailOptions2 = {
      from: process.env.SMTP_MAIL,
      to: [user2?.email || "guptadev265@gmail.com"],
      subject: "user signed alert",
      // react: <Welcome />
      // html: emailHtml,
      html: `<h3>Your document is signed by ${recipientEmail}</h3>`,
    };
    const updatedDocument = await prisma.document.update({
      where: {
        id: parseInt(docId || "0"),
      },
      data: {
        signnumber: {
          increment: 1,
        },
      },
    });

    await transporter.sendMail(mailOptions2, function (error: any, info: any) {
      if (error) {
        // console.log(check3)
        console.log(error);
      } else {
        console.log("Email sent successfully!");
        return NextResponse.json("data");
      }
    });
  }

  try {
    return NextResponse.json({
      message: "success",
      status: 200,
      pdf: pdfbytes4,
      oldurl: oldurl,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Imnernal Server Error",
      status: 500,
      error: error,
    });
  }
}
