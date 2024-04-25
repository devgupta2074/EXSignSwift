import React from "react";
import { FaSignature } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoMdDocument } from "react-icons/io";

const TableMenu = () => {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="dashboard-tablist bg-muted  text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1"
      data-orientation="horizontal"
    >
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
      <FaSignature className="react-icon"/>Inbox 
      </button>
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        <FaRegClock className="react-icon"/>Draft
      </button>
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        <IoIosCheckmarkCircleOutline className="react-icon"/>Pending
      </button>
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        <IoMdDocument className="react-icon" />All
      </button>
    </div>
  );
};

export default TableMenu;
