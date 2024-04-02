// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

interface Irec{
  name:string;
  email:string;
token:string,
documentId:number
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const {docId,recipient} = await req.json();
  console.log(docId,recipient)

  try{
    
    const result=await prisma.recipient.createMany({
      data: recipient.map((rec:Irec) => ({
        name: rec.name.toString(),
        email: rec.email.toString(),
        token: rec.token.toString(),
        documentId: parseInt(docId),
      })),
    })
    
    
    return NextResponse.json({
      message: "Document Created",
      recipient:result,
      status: 201,
    });
  }
  catch(error){
return NextResponse.json({
  message:"Imnernal Server Error",
  status: 500,
  error:error 
})
  }

    
  
}
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
