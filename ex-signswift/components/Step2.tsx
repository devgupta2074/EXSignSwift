"use client"
import React, { useState } from "react";
import Input from "./Input";

export default function Step2() {
    const [inputs, setInputs] = useState<JSX.Element[]>([<Input key={0} />]);

    function onClickHandler() {
        setInputs([...inputs, <Input key={inputs.length} />]);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Sign up to Early Adopter Plan</h1>
            <div className="space-y-4">
                {inputs.map((input, index) => (
                    <div key={index}>{input}</div>
                ))}
            </div>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickHandler}>Add</button>
            </div>
        </div>
    );
}
