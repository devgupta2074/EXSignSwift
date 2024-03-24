"use client";
import { DndComponent } from "@/components/DragDrop/dndComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export default function Document() {
  return (
    <div
      className="w-full flex flex-row  space-x-10 items-center pt-0 "
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      <DndProvider backend={HTML5Backend}>
        <DndComponent />
      </DndProvider>
    </div>
  );
}
