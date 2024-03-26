import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { Mail, User, Calendar, Text } from "lucide-react";
import DropItem from "../DropItem/dropItem";
interface FormProps {
  childrefs: RefObject<HTMLButtonElement>[];
  handleAddFields: () => void;
}
const Form: FC<FormProps> = ({ childrefs, handleAddFields }) => {
  const fieldValues = [
    { id: 1, text: "Signature", icon: null },
    { id: 2, text: "Email", icon: <Mail size={24} /> },
    { id: 3, text: "Name", icon: <User size={24} /> },
    { id: 4, text: "Date", icon: <Calendar size={24} /> },
    { id: 5, text: "Text", icon: <Text size={24} /> },
  ];

  return (
    <div
      className="flex justify-center items-start h-full bg-gray-800 mt-16"
      style={{ height: "90%" }}
    >
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
          <CardContent
            className="flex  gap-1 w-auto flex-col pt-5 pb-10"
            style={{}}
          >
            <fieldset className="grid grid-cols-2 gap-5 gap-x-19">
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
            <div className="flex gap-20 pt-10">
              <Button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors  w-2/5">
                Go Back
              </Button>
              <Button
                className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-2/5"
                onClick={handleAddFields}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
