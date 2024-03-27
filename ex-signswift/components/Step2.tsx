"use client"
import React, { ChangeEvent, useState } from "react";
import Input from "./Input";

export default function Step2() {
   

    const [name, setName] = useState<String[]>([]); 
    const [email, setEmail] = useState<String[]>([]);

    const handleNameChange = (event:ChangeEvent<HTMLInputElement>) => {
        setName([...name, event.target.value]);
    };

    // Function to handle changes in the email input
    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) => {
        setEmail([...email, event.target.value]);
    };
    const [inputs, setInputs] = useState<JSX.Element[]>([<Input key={0} onChangeName={handleNameChange} onChangeEmail={handleEmailChange}/>]);
    

    
    

    function onClickHandler() {
        console.log("name", name);
        console.log("Email", email);
       
        setInputs([...inputs, <Input key={inputs.length} onChangeName={handleNameChange} onChangeEmail={handleEmailChange}/>]);
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
