"use client";
import { DndComponent } from "@/components/DragDrop/dndComponent";
import PdfViewer from "@/components/PdfViewer/viewer";
import axios from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { set } from "zod";

async function fetchData(params: any) {
  try {
    const response = await axios.post("/api/document/getDocument", {
      userId: parseInt(params.id),
      id: params.documentId,
    });
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
  const [name, setName] = React.useState("");
  const router = useRouter();
  useEffect(() => {
    fetchData(params).then((response) =>
      setUrl(response?.data.Document.ShareLink)
    );
  }, [params]);

  console.log(url, "tapasavi");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflowY: "hidden",
        height: "100%",
        padding: "1rem",
      }}
      className="bg-gray-800"
    >
      <div id="pdf-viewer">
        <PdfViewer pdfurl={url} />
      </div>
      <div className="bg-gray-800 w-full mt-[5rem]">
        <div>
          <div className="w-full">
            <form
              id="document-flow-form-container"
              className=" border-rose-500 sticky flex h-full max-h-[64rem] flex-col overflow-auto rounded-xl border px-4 py-6 lg:h-[calc(100vh-6rem)]"
            >
              <div className="-mx-2 flex flex-1 flex-col px-2">
                <h3 className="text-white text-2xl font-semibold">General</h3>
                <p className="text-gray-100 mt-2 text-sm">
                  Configure general settings for the document.
                </p>
                <div className="border-border mb-0 mt-4"></div>
                <div className="custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2">
                  <div className="flex flex-1 flex-col">
                    <fieldset className="flex h-full flex-col space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Title
                          <span className="text-destructive ml-1 inline-block font-medium">
                            *
                          </span>
                        </label>
                        <input
                          className="border-input ring-offset-background placeholder:text-muted-foreground/40 focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-white text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800"
                          id="title"
                          value={name}
                          name="title"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className=" ">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Step <span>1 of 4</span>
                    </p>
                    <div className="relative h-1 bg-gray-300 rounded-full mb-2">
                      <div className="absolute left-0 top-0 h-full bg-rose-500 w-1/4"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-x-4">
                    <button
                      className="inline-flex items-center justify-center text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-secondary-foreground h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-500/80 flex-1 "
                      type="button"
                      disabled
                    >
                      Go Back
                    </button>
                    <button
                      className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                      type="button"
                      onClick={() => {
                        localStorage.setItem("title", name);
                        router.push(
                          `/user/${params.id}/document/${params.documentId}/step2`
                        );
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
