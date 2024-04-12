"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  React.useEffect(() => {
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
              x.push(response.data.Document);
              setSignedData(x);
            });
        });
      });
  }, [id]);

  const router = useRouter();
  console.log(signedData, "signed");
  return (
    <div className="w-full sm:p-4">
      <h2 className="p-4 text-white">Created Documents</h2>
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
                    <TableCell>{link?.title}</TableCell>
                    <TableCell>
                      <Button>
                        <Link href={link.ShareLink}>View</Link>
                      </Button>
                    </TableCell>
                    <TableCell>{link.status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          router.push(
                            `/user/${id.id}/document/${link.id}/step1`
                          );
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      <h2 className="p-4 text-white">Signed Documents</h2>
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
            {signedData
              ? signedData.map((link) => (
                  <TableRow key={link?.id}>
                    <TableCell>{link?.id}</TableCell>
                    <TableCell>{link?.title}</TableCell>
                    <TableCell>
                      <Button>
                        <Link href={link.ShareLink}>View</Link>
                      </Button>
                    </TableCell>
                    <TableCell>{link.status}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          router.push(`/user/${id.id}/signdoc/${link.id}`);
                        }}
                      >
                        Sign
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
