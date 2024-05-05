"use client";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

import Input from "./Input";
import { addRecepient, deleteRecepientById } from "@/api-service/recepientApi";
import { useApi } from "@/api-service/useApi";
import Loader from "./Loader";
import { DropdownMenuDemo } from "./DropDownMenu";
import { SignNumberDropDown } from "./SignNumberDropDown";

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
  const [selectedValue, setSelectedValue] = useState<string>("");

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
  const [emails, setEmails] = useState<any>([
    { email: "", name: "signers." + "0" + ".email" },
  ]);
  const [names, setNames] = useState<any>([
    { receptientname: "", name: "signers." + "0" + ".name" },
  ]);
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
    console.log(receptient);
    console.log(receptient);

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
      "https://ex-sign-swift.vercel.app/api/document/addreceptient",
      { docId, recipient: recipents }
    );
    console.log(response.data, "heell");
    if (response.data.success) {
      console.log("added succes");
      router.push(`/user/${userId}/document/${docId}/step3`);
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
      `https://ex-sign-swift.vercel.app/api/document/deleteRecepient/${id}`
    );
    if (response.data.success) {
      console.log("added succes");
      router.refresh();
    }
  };
  // if (loading3) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full  bg-[#F7F7F7]">
      <div className="w-full h-full">
        <form
          id="document-flow-form-container"
          className=" bg-[#F7F7F7] sticky flex h-full  flex-col overflow-auto rounded-xl border px-4 py-6"
        >
          <div className="-mx-2 flex flex-1 flex-col px-2">
            <h3 className="text-black text-2xl font-semibold">Add Signers</h3>
            <p className="text-black mt-2 text-sm">
              Add the people who will sign the document.
            </p>
            <div className="border  mb-6 mt-4"></div>
            <div className="custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2">
              <div className="flex flex-1 flex-col">
                <div className="space-y-4">
                  <div className="flex  flex-row gap-2">
                    <fieldset className="grid grid-cols-8 gap-4 pb-4">
                      <div className="space-y-2 relative col-span-3">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Email
                          <span className="text-destructive ml-1 inline-block font-medium">
                            *
                          </span>
                        </label>
                        {emails.map(
                          (
                            email: { email: string; name: string },
                            index: number
                          ) => (
                            <input
                              key={index}
                              className="bg-background border-input ring-offset-background placeholder:text-muted-foreground/40 focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Email"
                              id=":r17b:-form-item"
                              aria-describedby=":r17b:-form-item-description"
                              aria-invalid="false"
                              type="email"
                              value={email.email}
                              name={email.name}
                            />
                          )
                        )}
                      </div>
                      <div className="space-y-2 col-span-3">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Name
                        </label>
                        {names.map(
                          (
                            name: { receptientname: string; name: string },
                            index: number
                          ) => (
                            <input
                              key={index}
                              className="bg-background border-input ring-offset-background placeholder:text-muted-foreground/40 focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Name"
                              id=":r17c:-form-item"
                              aria-describedby=":r17c:-form-item-description"
                              aria-invalid="false"
                              value={name.receptientname}
                              name={name.name}
                            />
                          )
                        )}
                      </div>
                      <div className="space-y-2 col-span-1 mt-auto">
                        <button
                          type="button"
                          role="combobox"
                          aria-controls="radix-:r17e:"
                          aria-expanded="false"
                          aria-autocomplete="none"
                          dir="ltr"
                          data-state="closed"
                          className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background w-[60px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                            <path d="m15 5 3 3"></path>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="h-4 w-4 opacity-50"
                            aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                        {/* <select aria-hidden="true" name="signers.0.role">
                            <option value="SIGNER" selected>
                              Needs to sign
                            </option>
                            <option value="APPROVER">Needs to approve</option>
                            <option value="VIEWER">Needs to view</option>
                            <option value="CC">Receives copy</option>
                          </select> */}
                      </div>
                      <button
                        type="button"
                        className="col-span-1 mt-auto inline-flex h-10 w-10 items-center justify-center text-slate-500 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </fieldset>
                  </div>

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
                    className="bg-rose-500 hover:bg-rose-700 text-white font-normal py-2 px-4 rounded w-2/3"
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
