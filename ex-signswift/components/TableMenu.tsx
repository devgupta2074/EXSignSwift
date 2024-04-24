import React from "react";

const TableMenu = () => {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="bg-muted gap-20 p-4 text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1"
      data-orientation="horizontal"
    >
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        Inbox
      </button>
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        Draft
      </button>
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        Pending
      </button>
      <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        All
      </button>
    </div>
  );
};

export default TableMenu;
