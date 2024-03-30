// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document


export async function POST(req: NextRequest, res: NextApiResponse) {
  const {id} = await req.json();

  try{
    
    const rec=await prisma.recipient.create({
        data:{
            documentId:id,
            email:"TapasviArora2002@gmail.com",
            name:"TapasviArora",
            token:"sadad",
        }
    })
    
    return NextResponse.json({
      message: "Document Created",
      
      status: 201,
    });
  }
  catch(error){
return NextResponse.json({
  message:"Imnernal Server Error",
  status: 500,
})
  }

    
  
}
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
