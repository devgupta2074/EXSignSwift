"use client";
import PdfFillComponent from "@/components/DragDrop/pdfFillComponent";
import SignatureForm from "@/components/Form/signatureForm";
import PdfViewer from "@/components/PdfViewer/viewer";
import Step2 from "@/components/Step2";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
const page = ({ params }: { params: { id: string; documentId: string } }) => {
  const [title, setTitle] = React.useState<string>("");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const getDocument = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/document/getDocument",
        {
          docId: params.documentId,
        }
      );
      setTitle(response?.data?.Document?.title);
      setUrl(response?.data?.Document?.ShareLink);
    };
    getDocument();
  }, [params]);


import Input from "../../../../../../../components/Input";

import PdfViewer from "../../../../../../../components/PdfViewer/viewer";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

async function fetchData(params: any) {
  try {
    const response = await axios.post("/api/document/getDocument", {
      docId: params.documentId,
    });
    console.log(response.data, "ddev");
    return response;

    // Assuming you want to do something with the response data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function
interface InputObject {
  id: number;
  input: JSX.Element;
}
export default function Document({
  params,
}: {
  params: { id: string; documentId: string };
}) {
  const [url, setUrl] = React.useState("");
  const [count, setCount] = React.useState<number>(1);

  const [name, setName] = useState<String[]>([]);
  const [email, setEmail] = useState<String[]>([]);

  const handleNameChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedNames = [...name];
    updatedNames.splice(index, 1, event.target.value);
    setName(updatedNames);
  };

  const handleEmailChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedEmails = [...email];
    updatedEmails.splice(index, 1, event.target.value);
    setEmail(updatedEmails);
  };
  const [inputs, setInputs] = useState<InputObject[]>([
    {
      id: 0,
      input: (
        <Input
          key={0}
          onChangeName={(e) => handleNameChange(0, e)}
          onChangeEmail={(e) => handleEmailChange(0, e)}
        />
      ),
    },
  ]);

  const deleteInput = (id: number): void => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    // Assuming you need to update the state or any other action after deletion
    // For example:
    setInputs(updatedInputs);
  };

  const onContinue = async (e: any) => {
    e.preventDefault();
    const recipents: { name: String; email: String; token: String }[] = [];
    for (let i = 0; i < inputs.length; i++) {
      recipents.push({
        name: name[inputs[i].id],
        email: email[inputs[i].id].toLowerCase(),
        token: i.toString(),
      });
    }

    localStorage.setItem("recipents", JSON.stringify(recipents));
    try {
      const response = await axios.post("/api/document/addreceptient", {
        documentId: params.documentId,
        recpients: recipents,
      });
      console.log(response.data, "ddev");
    } catch (error) {}
  };
  function onClickHandler(e: any) {
    e.preventDefault();
    if (count === 0) {
      setCount(1);
    }

    console.log("name", name);
    console.log("Email", email);
    console.log("count", count);
    setInputs([
      ...inputs,
      {
        id: count,
        input: (
          <Input
            key={inputs.length}
            onChangeName={(e) => handleNameChange(count, e)}
            onChangeEmail={(e) => handleEmailChange(count, e)}
          />
        ),
      },
    ]);
    setCount(count + 1);
  }
  console.log(inputs);
  const handleDelete = (e: any, id: number) => {
    e.preventDefault();
    deleteInput(id);
  };

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
                    <div className="space-y-4">
                      {inputs.map((input) => (
                        <div key={input.id} className="flex space-x-2">
                          <Input
                            key={input.id}
                            onChangeName={(e) => handleNameChange(input.id, e)}
                            onChangeEmail={(e) =>
                              handleEmailChange(input.id, e)
                            }
                          />
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => handleDelete(e, input.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <button
                        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => onClickHandler(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Step <span>2 of 4</span>
                    </p>
                    <div className="relative h-1 bg-gray-300 rounded-full mb-2">
                      <div className="absolute left-0 top-0 h-full bg-rose-500 w-2/4"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-x-4">
                    <button
                      className="inline-flex items-center justify-center text-white text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-secondary-foreground h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-500/80 flex-1 "
                      type="button"
                      onClick={() => {
                        router.push(
                          `/user/${params.id}/document/${params.documentId}/step1`
                        );
                      }}
                    >
                      Go Back
                    </button>
                    <button
                      className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                      type="button"
                      onClick={(e) => {
                        onContinue(e);
                        router.push(
                          `/user/${params.id}/document/${params.documentId}/step3`
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
