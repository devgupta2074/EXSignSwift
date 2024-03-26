// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { id, userId } = await req.json();

  if (req.method === "POST") {
    // create user
    console.log("post");
    console.log("create user");
    const customer = await prisma.document.findUnique({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Document",
      Document: customer,
      status: 201,
    });
  }
}
