import React, { ChangeEvent } from "react";

interface InputProps {
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ onChangeName, onChangeEmail }: InputProps) {
  return (
    <div className="flex flex-row space-x-2">
      <input
        type="text"
        placeholder="Name"
        className="border text-white border-gray-300 bg-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-rose-500"
        onChange={onChangeName}
      />
      <input
        type="text"
        placeholder="E-mail"
        className="border text-white border-gray-300 bg-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-rose-500"
        onChange={onChangeEmail}
      />
    </div>
  );
}
