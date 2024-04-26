"use client";
import PdfViewer from "@/components/PdfViewer/viewer";
import React, { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useApi } from "@/api-service/useApi";
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
import {
  getDocumentById,
  updateDocumentTitle,
} from "@/api-service/documentApi";
import Loader from "@/components/Loader";
import H2 from "@/components/Typography/H2";
import H4 from "@/components/Typography/H4";

interface IData {
  Document: {
    ShareLink: string;
    createdAt: Date;
    id: number;
    title: string;
    status: string;
    updatedAt: Date;
  };
}

export default function Document({
  params,
}: {
  params: { id: string; documentId: string };
}) {
  const router = useRouter();
  const { loading, error, data, request } = useApi(getDocumentById) as {
    loading: boolean;
    error: string;
    data: IData | null;
    request: (...args: any[]) => Promise<any>;
  };
  const {
    loading: loading2,
    error: error2,
    data: data2,
    request: request2,
  } = useApi(updateDocumentTitle) as {
    loading: boolean;
    error: string;
    data: any;
    request: (...args: any[]) => Promise<any>;
  };

  useEffect(() => {
    request({ docId: params.documentId });
  }, [params]);

  const handleSave = () => {
    const data = {
      id: params.documentId,
      title: title,
    };
    request2(data);
  };
  const handleBack = () => {
    router.back();
  };
  if (data2?.success) {
    router.push(`/user/${params.id}/document/${params.documentId}/step2`);
  }
  const [title, setTitle] = React.useState<string>("");
  const [notempty, setNotEmpty] = React.useState<boolean>(false);
  useEffect(() => {
    if (title.length > 0) {
      setNotEmpty(true);
    } else {
      setNotEmpty(false);
    }
  }, [title]);
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <Loader />
      </div>
    );
  }
  return (
    <div
      className="w-full flex flex-col p-10 px-16  items-start"
      style={{ overflowY: "scroll" }}
    >
      <div className="w-full flex flex-col gap-7">
        <H2>{data?.Document?.title || "Pdf_file_name"}</H2>
        <H4>Invited you to view the document</H4>
      </div>
      <div className="flex gap-32 pt-5 w-full">
        <div
          style={{
            overflowX: "hidden",
            overflowY: "hidden",
          }}
          id="pdf-viewer"
          className="rounded-md h-full w-[40rem]"
        >
          <PdfViewer url={data?.Document?.ShareLink || ""} />
        </div>
        <div className=" w-[30rem] h-full">
          <div>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="account">Document</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Document</CardTitle>
                    <CardDescription>Give name to document</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Title</Label>
                      <Input
                        id="name"
                        defaultValue={data?.Document?.title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <div className="p-5 pb-0 mt-72">
                    <p className="text-muted-foreground text-sm">
                      Step <span>1 of 4</span>
                    </p>
                    <div className="relative h-1  rounded-full mb-2">
                      <div className="absolute left-0 top-0 h-full bg-rose-500 w-1/4"></div>
                    </div>
                  </div>
                  <CardFooter className="w-full flex flex-row-reverse gap-5 p-5">
                    {notempty ? (
                      loading2 ? (
                        <Button
                          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                          disabled
                        >
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button
                          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                          onClick={handleSave}
                        >
                          Save changes
                        </Button>
                      )
                    ) : (
                      <Button
                        disabled
                        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                        onClick={handleSave}
                      >
                        Save changes
                      </Button>
                    )}
                    <Button
                      className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                      onClick={handleBack}
                    >
                      Go Back
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
