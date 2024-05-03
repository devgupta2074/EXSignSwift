// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { userId, email } = await req.json();
  console.log(userId, email, "email");

  //all docs of craeted user where user is not the signer

  //all drafts  ->from users

  try {
    const document1 = await prisma.document.findMany({
      where: {
        AND: {
          userId: userId,
          NOT: {
            Recipient: {
              some: {
                email: {
                  equals: email,
                },
              },
            },
          },
        },
      },
    });
    //draft->can edit those docs  //pending->cant do anthying on these
    // dont want those in which he is a  signer

    //return docs with status pending and user is the recepient

    //get all doc that user has to sign
    const document2 = await prisma.document.findMany({
      where: {
        Recipient: {
          some: {
            email: {
              equals: email,
            },
          },
        },
        status: {
          equals: "PENDING",
        },
      },
      include: {
        Recipient: true,
      },
    });
    console.log(document1, "document 1 are");
    // documents-> that user has to sign
    //document2->user has to sign
    const documentsWithStatus = [
      ...document2.map((doc) => ({ ...doc, status: "SIGN" })),
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
