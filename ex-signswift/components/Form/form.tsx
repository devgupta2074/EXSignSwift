"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import { FC } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Mail, User, Calendar, Text } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import DropItem from "../DropItem/dropItem";
import ComboBox from "../DragDrop/comboBox";
import axios from "axios";

interface DroppedItem {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  pageNumber: number;
  text: string;
  icon: string;
  secondaryId: number;
  userEmail: string;
  userId: number;
}
//for which user->mail id save  getting from common box set value

interface FormProps {
  userId: string;
  docId: string;
  childrefs: RefObject<HTMLButtonElement>[];
  copiedItems: DroppedItem[];
  value: number;
  setValue: (value: number) => void;
  value2: string;
  setValue2: (value: string) => void;
}
const Form: FC<FormProps> = ({
  childrefs,
  copiedItems,
  value,
  setValue,
  value2,
  setValue2,
  userId,
  docId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleContinue = async () => {
    setLoading(true);
    try {
      const saveDocsSign = await axios.post("/api/document/saveDocsSign", {
        docId: "1",
        droppedItem: copiedItems,
      });
      setLoading(false);
      router.push(`/user/${userId}/document/${docId}/step4`);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("copied item in form", copiedItems);

  const fieldValues = [
    { id: 1, text: "Signature", icon: null },
    { id: 2, text: "Email", icon: <Mail size={24} /> },
    { id: 3, text: "Name", icon: <User size={24} /> },
    { id: 4, text: "Date", icon: <Calendar size={24} /> },
    { id: 5, text: "Text", icon: <Text size={24} /> },
  ];

  return (
    <div className="flex justify-center items-start h-full bg-gray-800 mt-16">
      <div className="w-auto" style={{ height: "100%" }}>
        <Card
          className="p-6 mt-4  bg-gray-800 border-2 border-rose-500 "
          style={{ height: "95%" }}
        >
          <CardContent>
            <h1 className="text-3xl font-semibold text-white">
              Add Fields Form
            </h1>
          </CardContent>
          <CardContent className="w-full">
            <ComboBox
              value={value}
              setValue={setValue}
              value2={value2}
              setValue2={setValue2}
            />
          </CardContent>

          <CardContent
            className="flex  gap-1 w-auto flex-col pt-5 pb-10"
            style={{}}
          >
            <fieldset className="grid grid-cols-2 gap-7 gap-x-25">
              {childrefs.map((childref, index) => (
                <DropItem
                  key={index}
                  childref={childref}
                  itemId={index}
                  text={fieldValues[index].text}
                  icon={fieldValues[index].icon}
                />
              ))}
            </fieldset>
            <div className="flex gap-20 pt-7 items-center justify-center">
              <Button
                className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors  w-full"
                type="button"
              >
                Go Back
              </Button>

              {loading ? (
                <Button
                  disabled
                  className=" bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-full"
                >
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  className=" bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-full"
                  type="button"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
