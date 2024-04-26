// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { email } = await req.json();
  console.log(email);
  console.log(email);
  try {
    const recep = await prisma.recipient.findFirst({
      where: {
        email: email,
      },
      include: {
        Document: true,
      },
    });
    const rid = recep?.id;
    // getting all unsigned docs

    const documents = await prisma.document.findMany({
      where: {
        Recipient: {
          some: {
            email: email,
            signingStatus: "NOT_SIGNED",
          },
        },
      },
      include: {
        Recipient: true,
      },
    });

    console.log(documents);

    return NextResponse.json({
      message: "Document",
      Document: documents,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
