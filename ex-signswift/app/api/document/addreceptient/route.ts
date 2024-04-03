// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { recpients } = await req.json();

  console.log(recpients);
  try {
    const rec = await prisma.recipient.createMany({
      data: recpients,
    });

    return NextResponse.json({
      message: "Document Created",

      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Imnernal Server Error",
      status: 500,
      error: error,
    });
  }
}
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
