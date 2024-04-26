// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { userId } = await req.json();
  console.log(userId);
  console.log(userId);
  try {
    const document = await prisma.document.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({
      message: "Document",
      Document: document,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
