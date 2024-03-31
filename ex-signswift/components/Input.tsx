import React from "react";

export default function Input() {
    return (
        <div className="flex flex-col space-y-2">
            <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <input
                type="text"
                placeholder="E-mail"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
        </div>
    );
}
