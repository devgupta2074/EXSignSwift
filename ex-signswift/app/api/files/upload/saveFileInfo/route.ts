import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";

import type { PresignedUrlProp, FileInDBProp } from "@/app/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  const presignedUrls = (await req.json()) as PresignedUrlProp[];
  console.log(presignedUrls, "devv");

  // Get the file name in bucket from the database
  const saveFilesInfo = await prisma.file.createMany({
    data: presignedUrls.map((file: FileInDBProp) => ({
      bucket:
        process.env.S3_BUCKET_NAME !== undefined
          ? process.env.S3_BUCKET_NAME
          : "",
      fileName: file.fileNameInBucket,
      originalName: file.originalFileName,
      size: file.fileSize,
    })),
  });

  console.log(saveFilesInfo);

  if (saveFilesInfo.count === 1) {
    return NextResponse.json({ message: "Files saved successfully" });
  } else {
    return NextResponse.json({ message: "Files not found" });
  }
}
