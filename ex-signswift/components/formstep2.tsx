"use client";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MdDeleteOutline } from "react-icons/md";

import Input from "./Input";
import { addRecepient, deleteRecepientById } from "@/api-service/recepientApi";
import { useApi } from "@/api-service/useApi";
import Loader from "./Loader";
import { DropdownMenuDemo } from "./DropDownMenu";
import { SignNumberDropDown } from "./SignNumberDropDown";
import axios from "axios";
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
  receptientProp,
}: {
  docId: string;
  userId: string;
  receptientProp: any;
}) {
  // const [count, setCount] = React.useState<number>(1);
  const [receptient, setReceptient] = React.useState<IReceptient[]>([]);
  const router = useRouter();
  const [name, setName] = useState<String[]>([]);
  const [email, setEmail] = useState<String[]>([]);

  const {
    loading: loading2,
    error: error2,
    data: data2,
    request: request2,
  } = useApi(addRecepient) as {
    loading: boolean;
    error: string;
    data: any;
    request: (...args: any[]) => Promise<any>;
  };
  const {
    loading: loading3,
    error: error3,
    data: data3,
    request: request3,
  } = useApi(deleteRecepientById) as {
    loading: boolean;
    error: string;
    data: any;
    request: (...args: any[]) => Promise<any>;
  };

  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log("number times step 2 render");
  }, []);

  const handleNameChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedNames = [...name];
    updatedNames.splice(index, 1, event.target.value);
    setName(updatedNames);
  };
  const [selectedOption, setSelectedOption] = useState<number[]>([0]);

  const handleDropDownMenu = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedNames = [...selectedOption];
    updatedNames.splice(index, 1, parseInt(event.target.value));
    setSelectedOption(updatedNames);
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
          onChangeSignnumber={(e) => handleDropDownMenu(0, e)}
        />
      ),
    },
  ]);
  interface recipent {
    name: string;
    email: string;
    token: number;
    signnumber: number;
  }

  const onContinue = async (e: any) => {
    e.preventDefault();
    console.log(receptientProp);
    console.log(inputs);
    if (receptientProp?.result?.length > 0 && inputs?.length <= 1) {
      router.push(`/user/${userId}/document/${docId}/step3`);
    } else {
      const recipents: recipent[] = [];
      for (let i = 0; i < inputs.length; i++) {
        recipents.push({
          name: name[inputs[i].id].toString(),
          email: email[inputs[i].id].toString(),
          token: i,
          signnumber: selectedOption[i],
        });
      }
      console.log(recipents);
      const response = await axios.post(
        "http://localhost:3000/api/document/addreceptient",
        { docId, recipient: recipents }
      );
      console.log(response.data, "heell");
      if (response.data.success) {
        console.log("added succes");
        router.push(`/user/${userId}/document/${docId}/step3`);
      }
    }
  };
  console.log(data2, "data2");
  if (data2?.count == 1) {
    console.log("added succes");
    router.push(`/user/${userId}/document/${docId}/step3`);
  }

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
            onChangeSignnumber={(e) => handleDropDownMenu(0, e)}
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
  const handleRemoveRecepient = async (id: number) => {
    console.log("recepitn to remove is ", id);
    const response = await axios.delete(
      `http://localhost:3000/api/document/deleteRecepient/${id}`
    );
    if (response.data.success) {
      console.log("added succes");
      router.refresh();
    }
  };
  if (loading3) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <form
          id="document-flow-form-container"
          className=" bg-white sticky flex h-full  flex-col overflow-auto rounded-xl border px-4 py-6"
        >
          <div className="-mx-2 flex flex-1 flex-col px-2">
            <h3 className="text-black text-2xl font-semibold">General</h3>
            <p className="text-black mt-2 text-sm">
              Configure general settings for the document.
            </p>
            <div className="border-border mb-0 mt-4"></div>
            <div className="custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2">
              <div className="flex flex-1 flex-col">
                <div className="space-y-4">
                  {inputs.map((input) => (
                    <div key={input.id} className="flex  flex-row gap-2">
                      <div className="w-full flex flex-row">
                        <Input
                          key={input.id}
                          onChangeName={(e) => handleNameChange(input.id, e)}
                          onChangeEmail={(e) => handleEmailChange(input.id, e)}
                          onChangeSignnumber={(e) =>
                            handleDropDownMenu(input.id, e)
                          }
                        />
                      </div>
                      <div className="flex justify-center items-center hover:cursor-pointer"></div>
                      <div className="flex justify-center items-center hover:cursor-pointer">
                        <DropdownMenuDemo />
                      </div>
                      <div
                        className="flex justify-center items-center hover:cursor-pointer"
                        onClick={(e) => handleDelete(e, input.id)}
                      >
                        <MdDeleteOutline size={25} className=" text-gray-600" />
                      </div>
                    </div>
                  ))}
                  {receptientProp?.result?.map((item: any) => (
                    <div className="flex flex-row gap-2">
                      <div className="flex flex-row gap-2">
                        <input
                          className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:border-rose-500 w-full"
                          type="email"
                          value={item.email}
                        />
                        <input
                          className="border text-black border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:border-rose-500 w-full"
                          type="name"
                          value={item.name}
                        />
                      </div>
                      <div
                        className="flex justify-center items-center hover:cursor-pointer"
                        onClick={() => handleRemoveRecepient(item.id)}
                      >
                        <MdDeleteOutline size={25} className=" text-gray-600" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    className="bg-rose-500 hover:bg-rose-700 text-white font-normal py-2 px-4 rounded"
                    onClick={(e) => onClickHandler(e)}
                  >
                    + Add Signer
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-72">
              <div>
                <p className="text-muted-foreground text-sm">
                  Step <span>2 of 4</span>
                </p>
                <div className="relative h-1 rounded-full mb-2">
                  <div className="absolute left-0 top-0 h-full bg-rose-500 w-2/4"></div>
                </div>
              </div>
              <div className="mt-4 flex gap-x-4">
                <button
                  className="inline-flex items-center justify-center text-white text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-secondary-foreground h-11 px-8 rounded-md bg-rose-500 hover:bg-rose-500/80 flex-1 "
                  type="button"
                  onClick={() => {}}
                >
                  Go Back
                </button>
                {loading2 ? (
                  <Button
                    disabled
                    className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
                  >
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <button
                    className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white hover:bg-rose-500/90 h-11 px-8 rounded-md bg-rose-500 flex-1"
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
