"use client";
import { DndComponent } from "@/components/DragDrop/dndComponent";
import PdfViewer from "@/components/PdfViewer/viewer";
import axios from "axios";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { set } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function fetchData(params: any) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/document/getDocument",
      { userId: parseInt(params.id), id: parseInt(params.documentId) }
      //why parse user id
    );
    console.log(response.data, "ddev");
    return response;

    // Assuming you want to do something with the response data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function

export default function Document({
  params,
}: {
  params: { id: string; documentId: string };
}) {
  const [url, setUrl] = React.useState("");
  const router = useRouter();
  // useEffect(() => {
  //   fetchData(params).then((response) =>
  //     setUrl(response?.data.Document.ShareLink)
  //   );
  // }, [params]);

  const handleSave = async () => {
    const data = {
      userId: 1,
      id: 1,
      title: title,
    };

    const updateDocRes = await axios.post(
      "http://localhost:3000/api/document/updateDocumentTitle",
      data
    );
    if (updateDocRes) {
      // router.push(`/user/${params.id}/document/${params.documentId}/step3`);
    }
    console.log(updateDocRes.data, "updateDocRes");
  };
  const [title, setTitle] = React.useState<string>("Random");
  return (
    <div
      className="w-full flex flex-row m-10 items-start gap-40 pt-0"
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        id="pdf-viewer"
        className="border-2 border-rose-500 rounded-md  h-4/5 w-1/2"
      >
        <PdfViewer url="" />
      </div>
      <div className="w-1/3 h-full  ">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Document</TabsTrigger>
            <TabsTrigger value="password">Name</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Document</CardTitle>
                <CardDescription>Give name to document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="name"
                    defaultValue="Random"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
