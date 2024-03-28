import React, { ChangeEvent } from "react";



interface InputProps {
    onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
}


export default function Input({onChangeName, onChangeEmail}:InputProps) {
    return (
        <div className="flex flex-col space-y-2">
            <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={onChangeName}
            />
            <input
                type="text"
                placeholder="E-mail"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={onChangeEmail}
            />
        </div>
    );
}
