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
      return (
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-1 mr-2 h-4 w-4"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
          </svg>
          Edit
        </div>
      );
    } else if (status === "SIGN") {
      return (
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-1 mr-2 h-4 w-4"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
          Sign
        </div>
      );
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
          { userId: id.id, email: id.email }
          //pending
          //why parse user id
        )
        .then((response) => {
          const document = response.data?.Document;
          setData(document);
          console.log(data, "hello dev");

          // setRecipientData(response && response?.data?.Document[0]?.Recipient);
        });
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const router = useRouter();
  console.log(signedData, "signed", "dev", data);
  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
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
              <TableHead className="font-medium">View</TableHead>
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
                      <Button className="bg-rose-400  w-24 hover:bg-rose-500 text-white font-medium ">
                        <Link href={link.ShareLink || ""}>
                          <H4>View</H4>
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="flex flex-row">
                      {link?.Recipient?.map((recpientData: any) => (
                        <div className="relative">
                          <div
                            className="rounded-full p-1 px-2 text-white font-semibold m-1"
                            style={{ backgroundColor: randomColor() }}
                            title={recpientData.email}
                          >
                            {recpientData.name.charAt(0).toUpperCase()}
                          </div>
                          <style jsx>{`
                            /* Additional styles for the tooltip */
                            .tooltip {
                              position: absolute;
                              bottom: calc(100% + 5px); /* Adjust as needed */
                              left: 50%;
                              transform: translateX(-50%);
                              padding: 5px;
                              background-color: rgba(0, 0, 0, 0.8);
                              color: #fff;
                              font-size: 12px;
                              border-radius: 3px;
                              white-space: nowrap;
                              opacity: 0;
                              pointer-events: none;
                              transition: opacity 0.3s ease;
                            }

                            .rounded-full:hover .tooltip {
                              opacity: 1;
                              pointer-events: auto;
                            }
                          `}</style>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{link.status}</TableCell>
                    <TableCell>
                      <Button
                        className="bg-rose-400  w-24 p-2 hover:bg-rose-500 text-white font-medium "
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
