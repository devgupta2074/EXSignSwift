"use client";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import axios from "axios";
import { Input as DefaultInput } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

import Input from "./Input";
interface InputObject {
  id: number;
  input: JSX.Element;
}
interface IReceptient {
  name: string;
  email: string;
}
export default function Step2({
  docId,
  userId,
}: {
  docId: string;
  userId: string;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(1);
  const [receptient, setReceptient] = React.useState<IReceptient[]>([]);
  const router = useRouter();
  const [name, setName] = useState<String[]>([]);
  const [email, setEmail] = useState<String[]>([]);

  useEffect(() => {
    const fetchRecepients = async () => {
      const result = await axios.post(
        "http://localhost:3000/api/document/getreceptient",
        docId
      );
      const receptientres = result?.data;

      receptientres?.result?.map((item: any) => {
        const res = {
          name: item.name,
          email: item.email,
        };
        setReceptient((prev) => [...prev, res]);
      });
    };
    fetchRecepients();
  }, [docId, userId]);

  console.log(email, name);

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
    updatedEmails.splice(index, 1, event.target.value.toLowerCase());
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
  interface recipent {
    name: string;
    email: string;
    token: number;
  }
  const onContinue = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const recipents: recipent[] = [];
    for (let i = 0; i < inputs.length; i++) {
      recipents.push({
        name: name[inputs[i].id].toString(),
        email: email[inputs[i].id].toString(),
        token: i,
      });
    }
    const createRecepients = async () => {
      const response = await axios.post(
        "http://localhost:3000/api/document/addreceptient",
        { docId, recipient: recipents }
      );
      console.log(response.data);
      router.push(`/user/${userId}/document/${docId}/step3`);
      setLoading(false);
    };
    createRecepients();
  };
  const deleteInput = (id: number): void => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    // Assuming you need to update the state or any other action after deletion
    // For example:
    setInputs(updatedInputs);
  };
  function onClickHandler(e: any) {
    e.preventDefault();
    if (count === 0) {
      setCount(1);
    }

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

  const handleDelete = (e: any, id: number) => {
    e.preventDefault();
    deleteInput(id);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <form
          id="document-flow-form-container"
          className=" border-rose-500 sticky flex h-full  flex-col overflow-auto rounded-xl border px-4 py-6"
        >
          <div className="-mx-2 flex flex-1 flex-col px-2">
            <h3 className=" text-2xl font-semibold">General</h3>
            <p className="text-gray-500 mt-2 text-sm">
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
                        onChangeEmail={(e) => handleEmailChange(input.id, e)}
                      />
                      <button
                        className=" bg-rose-500   bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        // 
                        onClick={(e) => handleDelete(e, input.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {receptient.map((item) => (
                    <div>
                      <DefaultInput
                        className="bg-white p-2"
                        type="email"
                        value={item.email}
                      />
                      <DefaultInput
                        className="bg-white p-2"
                        type="name"
                        value={item.name}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    className=" bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                    // bg-rose-500 
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
                  className="steps-button inline-flex items-center justify-center text-white text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-secondary-foreground h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-500/80 flex-1 "
                  type="button"
                  onClick={() => {}}
                >
                  Go Back
                </button>
                {loading ? (
                  <Button
                    disabled
                    className="steps-button inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                  >
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <button
                    className="steps-button inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                    type="button"
                    onClick={(e) => {
                      onContinue(e);
                    }}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
