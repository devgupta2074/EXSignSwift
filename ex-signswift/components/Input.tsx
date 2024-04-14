import React from "react";
import { ChangeEvent } from "react";
interface InputProps {
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ onChangeName, onChangeEmail }: InputProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <input
        type="text"
        placeholder="Name"
        className="border text-white   rounded-md px-3 py-2 focus:outline-none focus:border-rose-500"  
        // bg-gray-800 border-gray-300 
        onChange={onChangeName}
      />
      <input
        type="text"
        placeholder="E-mail"
        className="border text-white  rounded-md px-3 py-2 focus:outline-none focus:border-rose-500"
        // bg-gray-800 border-gray-300 
        onChange={onChangeEmail}
      />
    </div>
  );
}
