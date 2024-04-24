"use client";

import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import H4 from "@/components/Typography/H4";
import Loader from "@/components/Loader";

export type Payment = {
  id: string;
  ShareLink: string;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
};

export function DocumentTable(id: { id: string; email: string }) {
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = React.useState({});
  const [signedData, setSignedData] = React.useState([]);
  const [recpientData, setRecipientData] = React.useState([]);
  const [data, setData] = React.useState<any[]>([]);
  console.log(id);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .post(
        "http://localhost:3000/api/document/getAllUserDocuments",
        { userId: id.id }
        //why parse user id
      )
      .then((response) => {
        console.log(response.data, "response");
        setData(response?.data?.Document);
      });

    axios
      .post(
        "http://localhost:3000/api/document/getRecipientId",
        { email: id.email }
        //why parse user id
      )
      .then((response) => {
        console.log(response.data, "response");
        setRecipientData(response?.data?.result);
        response?.data?.result?.map((single: any) => {
          axios
            .post("http://localhost:3000/api/document/getDocument", {
              docId: parseInt(single.documentId),
            })
            .then((response: any) => {
              console.log(response.data, "response");
              const x = [...signedData];

              x?.push(response?.data?.Document);
              setSignedData(x);
            });
        });
      });
    setLoading(false);
  }, [id]);

  const router = useRouter();
  console.log(signedData, "signed");
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full sm:p-4">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Id</TableHead>
              <TableHead className="font-medium">Title</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.map((link) => (
                  <TableRow key={link?.id}>
                    <TableCell>{link?.id}</TableCell>
                    <TableCell>{link?.title || "NULL"}</TableCell>
                    <TableCell>
                      <Button className="bg-[#A2E771]  w-24 hover:bg-[#A2E77] ">
                        <Link href={link.ShareLink}>
                          <H4>View</H4>
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>{link.status}</TableCell>
                    <TableCell>
                      <Button
                        className="bg-[#A2E771]  w-24 p-2 hover:bg-[#A2E771] "
                        onClick={() => {
                          router.push(
                            `/user/${id.id}/document/${link.id}/step1`
                          );
                        }}
                      >
                        {/* Sign or view*/}
                        <H4>Sign</H4>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
