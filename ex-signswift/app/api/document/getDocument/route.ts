// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const {docId}=await req.json();
  
    try{
      const document = await prisma.document.findUnique({
        where: { id: parseInt(docId) },
        include: {Field:true},
      });
      
      return NextResponse.json({
        message: "Document",
        Document: document,
        status: 200,
      });
    }
    catch(error){
  return NextResponse.json({
    message:"Imnernal Server Error",
    status: 500,
  })
    }
  

 
  
}
