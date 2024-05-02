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
  const actionStatus = (status: any) => {
    if (status === "DRAFT") {
      return "View";
    } else if (status === "SIGN") {
      return "Sign";
    } else if (status === "PENDING") {
      return "Pending";
    } else if (status === "COMPLETED") {
      return "completed";
    }
  };
  const actionStatusUrl = (link: any) => {
    if (link.status === "DRAFT") {
      return `http://localhost:3000/user/d07aab98-907a-44c7-83ab-9e3e77dbe6ca/document/${link.id}/step1`;
    } else if (link.status === "SIGN") {
      return `http://localhost:3000/user/d07aab98-907a-44c7-83ab-9e3e77dbe6ca/signdoc/${link.id}`;
    } else if (link.status === "PENDING") {
      return "";
    } else if (link.status === "COMPLETED") {
      return link.ShareLink;
    }
  };
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .post(
          "http://localhost:3000/api/document/getDocumentForUser",
          { userId: id.id }
          //why parse user id
        )
        .then((response) => {
          const document = response.data?.Document;

          setData(document);
          // setRecipientData(response && response?.data?.Document[0]?.Recipient);
        });
      setLoading(false);
    };
    fetchData();
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
              <TableHead className="font-medium">Created at</TableHead>
              <TableHead className="font-medium">Title</TableHead>
              <TableHead className="font-medium">Recipient</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.map((link) => (
                  <TableRow key={link?.id}>
                    <TableCell>
                      {new Date(link?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{link?.title || "NULL"}</TableCell>
                    <TableCell>
                      <Button className="bg-rose-500  w-24 hover:bg-[#A2E77] text-white ">
                        <Link href={link.ShareLink || ""}>
                          <H4>View</H4>
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>{link.status}</TableCell>
                    <TableCell>
                      <Button
                        className="bg-rose-500  w-24 p-2 hover:bg-rose-600 text-white "
                        onClick={() => {
                          router.push(actionStatusUrl(link));
                        }}
                      >
                        {/* Sign or view*/}
                        <H4>{actionStatus(link?.status)}</H4>
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
