import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { Mail, User, Calendar, Text } from "lucide-react";
import DropItem from "../DropItem/dropItem";
interface FormProps {
  childref: RefObject<HTMLButtonElement>;
  childref1: RefObject<HTMLButtonElement>;
  childref2: RefObject<HTMLButtonElement>;
  childref3: RefObject<HTMLButtonElement>;
  childref4: RefObject<HTMLButtonElement>;
}
const Form: FC<FormProps> = ({
  childref,
  childref1,
  childref2,
  childref3,
  childref4,
}) => {
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
              <DropItem
                childref={childref}
                itemId={0}
                text={"Signature"}
                icon={null}
              />

              <DropItem
                childref={childref1}
                itemId={1}
                text={"Email"}
                icon={<Mail size={24} />}
              />
              <DropItem
                childref={childref2}
                itemId={2}
                text={"Name"}
                icon={<User size={24} />}
              />
              <DropItem
                childref={childref3}
                itemId={3}
                text={"Date"}
                icon={<Calendar size={24} />}
              />
              <DropItem
                childref={childref4}
                itemId={4}
                text={"Text"}
                icon={null}
              />
            </fieldset>
            <div className="flex gap-20 pt-10">
              <Button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors  w-2/5">
                Go Back
              </Button>
              <Button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-2/5">
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
