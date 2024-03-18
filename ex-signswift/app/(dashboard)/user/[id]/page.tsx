import { Payment, columns } from "@/components/(dashboard)/User/Columns";
import { DocumentTable } from "@/components/(dashboard)/User/DocumentTable";

import { DocumentDropzone } from "@/components/(dashboard)/User/Upload";
import UploadContainer from "@/components/(dashboard)/User/UploadContainer";

export default async function Dashboard() {
  return (
    <main className=" flex flex-col gap-4 bg-gray-800">
      {/* User Dashboard with ID here the user should be directed to after login
      here will be the upload and table function */}

      <UploadContainer />
      <DocumentTable />

      {/* <p>navbar upload table</p> */}
    </main>
  );
}
