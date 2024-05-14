import { Console } from "console";
import prisma from "../../../../lib/prisma";
import {NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("API");
    const {id} =await req.json();
    try {
        console.log("got the id",id);
        const draft = await prisma.document.count({
            where: {
              userId: id,
              status: "DRAFT"
            }
          });
        const pending = await prisma.document.count({
            where: {
              userId: id,
              status: "PENDING"
            }
          });
        const completed = await prisma.document.count({
            where: {
              userId: id,
              status: "COMPLETED"
            }
          });
        return NextResponse.json({ count: draft+pending+completed,
            draft,
            pending,
            completed
         });
    } catch (error) {
        console.error("Error fetching document count:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
