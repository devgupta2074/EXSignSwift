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
  const { docId, copiedItems, isLast, recipientEmail } = await req.json();

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
    fs.writeFileSync(
      "/Users/tapasviarora/EXSignSwift/ex-signswift/components/PdfSign/sow2.pdf",
      pdfBytes2
    );
    // signDoc();
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
      to: [user2?.email],
      subject: "check_multiple in main",
      // react: <Welcome />
      // html: emailHtml,
      html: " <h3>Your document is signed by all recipients</h3>",
      attachments: [
        {
          filename: document?.title,
          path: "/Users/tapasviarora/EXSignSwift/ex-signswift/components/PdfSign/sow2.pdf",
          contentType: "application/pdf",
        },
      ],
    };
    await transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        // console.log(check3)
        console.log(error);
      } else {
        console.log("Email sent successfully!");
        return NextResponse.json("data");
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
      to: [user2?.email || "tapasviarora2002@gmail.com"],
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
    });
  } catch (error) {
    return NextResponse.json({
      message: "Imnernal Server Error",
      status: 500,
      error: error,
    });
  }
}
