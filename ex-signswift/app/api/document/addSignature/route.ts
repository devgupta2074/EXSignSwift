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

import fs from "fs";
import path from "path";

//update title of document

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
  recipientId: number;
  signature: string;
}
export async function POST(req: NextRequest, res: NextApiResponse) {
  const { docId, copiedItems } = await req.json();
  console.log(docId, copiedItems);
  const document = await prisma.document.findUnique({
    where: {
      id: parseInt(docId),
    },
    include: {
      Field: true,
    },
  });
  const pdfUrl = document?.ShareLink || "";

  console.log(pdfUrl);
  const response = await fetch(pdfUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch PDF file");
  }
  // console.log(response);
  const pdfBytes = await response.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);

  copiedItems?.map(async (item: IField) => {
    if (item?.signature && item?.signature !== "") {
      const pngImage = await pdfDoc.embedPng(item?.signature);

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
  fs.writeFileSync(
    "/Users/tapasviarora/EXSignSwift/ex-signswift/components/PdfSign/sow2.pdf",
    pdfBytes2
  );
  signDoc(copiedItems);
  //role recpient->creater ,reader,signer
  //mail will be sent to  all
  // and in case signer when its his step to sign doc

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: ["guptadev545@gmail.com"],
    subject: "check_multiple in main",
    // react: <Welcome />
    // html: emailHtml,
    html: " <h3>heloo</h3>",
    attachments: [
      {
        filename: "pdfsadsada",
        path: "C:/Users/dgupta/Desktop/hrtech/EXSignSwift/ex-signswift/demoooo2.pdf",
        contentType: "application/pdf",
      },
    ],
  };
  console.log("check2");
  await transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      // console.log(check3)
      console.log(error);
    } else {
      console.log("Email sent successfully!");
      return NextResponse.json("data");
    }
  });
  try {
    return NextResponse.json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Imnernal Server Error",
      status: 500,
      error: error,
    });
  }
}
