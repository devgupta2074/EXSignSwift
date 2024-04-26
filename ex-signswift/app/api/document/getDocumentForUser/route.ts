// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { userId, email } = await req.json();
  console.log(userId, email, "email");

  try {
    const document1 = await prisma.document.findMany({
      where: {
        userId: userId,
      },
    });

    //
    //
    // const recep = await prisma.recipient.findFirst({
    //   where: {
    //     email: email,
    //   },
    //   include: {
    //     Document: true,
    //   },
    // });

    // getting all unsigned docs

    const documents = await prisma.document.findMany({
      where: {
        Recipient: {
          some: {
            email: {
              equals: email,
            },
            signingStatus: { equals: "NOT_SIGNED" },
          },
        },
      },
      include: {
        Recipient: true,
      },
    });

    const documentsWithStatus = [
      ...documents.map((doc) => ({ ...doc, status: "SIGN" })),
      ...document1.map((doc) => ({ ...doc })),
    ];
    // signer-> last user->completed

    return NextResponse.json({
      message: "Document",
      Document: documentsWithStatus,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
