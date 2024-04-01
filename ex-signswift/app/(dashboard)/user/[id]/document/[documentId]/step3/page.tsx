"use client";
import { DndComponent } from "@/components/DragDrop/dndComponent";
import axios from "axios";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

async function fetchData(params: any) {
  try {
    const response = await axios.post("/api/document/getDocument", {
      userId: parseInt(params.id),
      id: params.documentId,
    });
    console.log(response.data);
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
  const response = fetchData(params).then((response) =>
    setUrl(response?.data.Document.url)
  );
  return (
    <div
      className="w-full flex flex-row  space-x-10 items-center pt-0 "
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      <DndProvider backend={HTML5Backend}>
        <DndComponent url={url} />
      </DndProvider>
    </div>
  );
}
