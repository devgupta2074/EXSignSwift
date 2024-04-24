import { Payment, columns } from "@/components/(dashboard)/User/Columns";
import { DocumentTable } from "@/components/(dashboard)/User/DocumentTable";

import { DocumentDropzone } from "@/components/(dashboard)/User/Upload";
import * as React from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UploadContainer from "../../../../components/(dashboard)/User/UploadContainer";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";
import TableMenu from "@/components/TableMenu";

export default async function Dashboard({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  if (!session?.user) {
    console.log(session);
    redirect(`/login`);
  }

  return (
    <main className=" flex flex-col gap-4  items-center px-16">
      {/* User Dashboard with ID here the user should be directed to after login
      here will be the upload and table function */}

      <div className="w-full   mt-8">
        <UploadContainer id={params.id} />
      </div>
      <div className="mt-10 w-full flex items-center">
        <div className="w-full">
          <H2>Documents</H2>
        </div>
        <div className="w-full justify-end items-center flex">
          <TableMenu />
        </div>
      </div>
      <div className="w-full">
        <DocumentTable id={params.id} email={session?.user?.email} />
      </div>
      {/* <p>navbar upload table</p> */}
    </main>
  );
}
