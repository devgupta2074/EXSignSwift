// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { ReactNode } from "react";
interface DroppedItem {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  pageNumber: number;
  text: string;
  icon: ReactNode;
  userEmail: string;
  userId: number;
}
interface ExtendedNextApiRequest extends NextApiRequest {
    body:{
        droppedItem:DroppedItem[],
        docId:string,
    }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const {docId,droppedItem}= await req.json();
  console.log(docId,droppedItem);



const updateDocument=await prisma.document.update({
  where:{
    id:parseInt(docId)
  },
  data:{

    Field:{
      createMany:{
        data:droppedItem.map((field:DroppedItem) => ({
          secondaryId:field.id.toString(),
          page: field.pageNumber,
          recipientId:field.userId,
          left: field.left,
          top: field.top,
          width: field.width,
          height: field.height,
          text: field.text,
        })),
      }

    }
  }

})
console.log(updateDocument,"updateDocument");
  
    return NextResponse.json({
      message: "Document Field created successfully",
      status: 201,
    });
  
}
