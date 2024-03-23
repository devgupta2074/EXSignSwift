"use client";
import React, { ReactElement, useState } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import PdfViewer from "../PdfViewer/viewer";
import { FaTrash } from "react-icons/fa";
import { ResizableBox } from "react-resizable";
import { ReactNode } from "react";
import Form from "../Form/form";
import { LuTrash } from "react-icons/lu";

import { FC, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import myFile from "../PdfViewer/sow2.pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { RefObject } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
interface PdfViewerProps {
  parentRef: RefObject<HTMLDivElement>;
}

interface DroppedItem {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  pageNumber: number;
  text: string;
  icon: ReactNode;
}
interface ChildRefs {
  [key: number]: React.MutableRefObject<HTMLButtonElement | null>;
}

export const DndComponent = () => {
  const [numPages, setNumPages] = useState<number>(0);
  //   useEffect(() => {
  //     console.log(myFile);
  //   }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const childref = useRef<HTMLButtonElement>(null);
  const childref1 = useRef<HTMLButtonElement>(null);
  const childref2 = useRef<HTMLButtonElement>(null);
  const childref3 = useRef<HTMLButtonElement>(null);
  const childref4 = useRef<HTMLButtonElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [copiedItems, setCopiedItems] = useState<DroppedItem[]>([]);
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const pdfViewer = document.getElementById("pdf-viewer");
      if (pdfViewer) {
        pdfViewer.scrollTop += event.deltaY;
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const childRefs: ChildRefs = {
    0: childref,
    1: childref1,
    2: childref2,
    3: childref3,
    4: childref4,
  };
  const [, drop] = useDrop({
    accept: "test",
    drop: (item: { id: number }, monitor) => {
      let actualChildRef = childRefs[item.id];
      console.log("dropping");
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta || !parentRef.current) return;

      //214 798
      //817-
      const childRect = actualChildRef?.current?.getBoundingClientRect();
      const parentRect = parentRef?.current?.getBoundingClientRect();
      console.log(parentRect);
      console.log(delta);
      console.log(childRect);
      let left = (childRect?.left || 0) + delta.x - parentRect.left;
      let top = (childRect?.top || 0) + delta.y - parentRect?.top;
      left = Math.max(0, left);
      top = Math.max(0, top);
      left = Math.min(left, parentRect.width - (childRect?.width || 0));
      top = Math.min(top, parentRect.height - (childRect?.height || 0));
      const newItem = {
        icon: actualChildRef?.current?.querySelector("div")?.innerHTML || "",
        pageNumber: currentPage,
        id: copiedItems?.length,
        left,
        top,
        text: actualChildRef?.current?.innerText || "",
        width: childRect?.width,
        height: childRect?.height,
      };
      console.log(copiedItems);
      setCopiedItems([...copiedItems, newItem]);
    },
  });
  //2rem->40
  const moveItem = (id: number, left: number, top: number) => {
    const newItems = copiedItems.map((item) => {
      if (item.id === id) {
        return { ...item, left, top };
      }
      return item;
    });
    setCopiedItems(newItems);
  };
  const deleteItem = (id: number) => {
    setCopiedItems(copiedItems.filter((item) => item.id !== id));
  };

  drop(parentRef);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflowY: "hidden",
        height: "100%",
        padding: "1rem",
      }}
      className="bg-gray-800"
    >
      <div>
        <div
          style={{
            height: "70%",
            marginTop: "5rem",
            overflowY: "scroll",
            overflowX: "clip",
          }}
          id="pdf-viewer"
          className="border-2 border-rose-500 rounded-md m-2"
        >
          <Document file={myFile} onLoadSuccess={onDocumentLoadSuccess}>
            <div
              className=""
              style={{
                border: "2px solid green",
                position: "relative",
              }}
              ref={parentRef}
            >
              {copiedItems.map(
                (item, indx) =>
                  item.pageNumber === currentPage && (
                    <div
                      key={indx}
                      style={{
                        width: item.width,
                        height: item.height,
                        left: item.left,
                        top: item.top,
                        position: "absolute",
                        borderRadius: "0.5rem",
                        zIndex: 1000,
                        boxShadow: " inset 0 0 0 100px rgb(	173, 216, 230,.2)",
                        backdropFilter: "blur(0.9px)",
                        fontWeight: "500",
                      }}
                    >
                      <ResizableBox
                        width={item?.width}
                        height={item?.height}
                        minConstraints={[100, 100]}
                        maxConstraints={[500, 500]}
                        handle={
                          <div>
                            <span
                              className="custom-resize-handle"
                              style={{
                                position: "absolute",
                                width: "10px",
                                height: "10px",
                                bottom: "0",
                                right: "0",
                                zIndex: 2000,
                                cursor: "se-resize",
                              }}
                            />
                            <span
                              className="custom-resize-handle"
                              style={{
                                position: "absolute",
                                width: "10px",
                                height: "10px",
                                zIndex: 2000,
                                bottom: "0",
                                left: "0",
                                cursor: "sw-resize",
                              }}
                            />
                            <span
                              className="custom-resize-handle"
                              style={{
                                width: "10px",
                                height: "10px",
                                zIndex: 2000,

                                cursor: "nw-resize",
                              }}
                            />
                            <span
                              className="custom-resize-handle"
                              style={{
                                position: "absolute",
                                width: "15px",
                                height: "90%",
                                left: "0",
                                zIndex: 2000,
                                top: "0",
                                cursor: "w-resize",
                              }}
                            />
                            <span
                              className="custom-resize-handle"
                              style={{
                                position: "absolute",
                                width: "15px",
                                right: "0",
                                height: "70%",
                                marginTop: "1rem",
                                zIndex: 1200,

                                cursor: "e-resize",
                              }}
                            />
                          </div>
                        }
                        style={{
                          position: "absolute",
                          // left: item.left,
                          // top: item.top,
                          width: 200,
                        }}
                        draggableOpts={{ grid: [25, 25] }}
                        onResize={(e, { size }) => {
                          const newWidth = size.width;
                          console.log("resizing");
                          const newHeight = size.height;
                          const newItems = copiedItems.map((item1) => {
                            if (item1.id === item.id) {
                              return {
                                ...item1,
                                width: newWidth,
                                height: newHeight,
                              };
                            }
                            return item1;
                          });
                          setCopiedItems(newItems);
                        }}
                      >
                        <div
                          key={item.id}
                          style={{
                            position: "absolute",
                            width: item.width,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: item.height,
                            textAlign: "center",
                            zIndex: 1200,
                            cursor: "move",
                          }}
                          onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startLeft = item.left;
                            const startTop = item.top;

                            const handleMouseMove = (e: MouseEvent) => {
                              let left = startLeft + e.clientX - startX;
                              let top = startTop + e.clientY - startY;
                              console.log(left, top, "onmouse move");
                              const parentRect =
                                parentRef?.current?.getBoundingClientRect();
                              const childRect =
                                childref?.current?.getBoundingClientRect();
                              left = Math.max(0, left);
                              const maxLeft =
                                (parentRect?.width || 0) -
                                (childRect?.width || 0) +
                                (parentRect?.left || 0) -
                                35;
                              left = Math.min(left, maxLeft);
                              top = Math.max(0, top);
                              const maxTop =
                                (parentRect?.height || 0) -
                                (childRect?.height || 0) -
                                5;
                              top = Math.min(top, maxTop);
                              moveItem(item.id, left, top);
                            };

                            const handleMouseUp = () => {
                              document.removeEventListener(
                                "mousemove",
                                handleMouseMove
                              );
                              document.removeEventListener(
                                "mouseup",
                                handleMouseUp
                              );
                            };

                            document.addEventListener(
                              "mousemove",
                              handleMouseMove
                            );
                            document.addEventListener("mouseup", handleMouseUp);
                          }}
                        >
                          <div
                            onClick={() => deleteItem(item.id)}
                            style={{
                              position: "absolute",
                              top: -10,

                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              right: -10,

                              width: "2rem",
                              backgroundColor: "white",
                              height: "2rem",
                              borderRadius: "50%",
                            }}
                          >
                            <LuTrash
                              style={{
                                cursor: "pointer",
                                color: "grey",
                              }}
                              size={15}
                            />
                          </div>
                          <div style={{ display: "flex", gap: 5 }}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item?.icon || "",
                              }}
                            ></div>
                            <div>{item?.text}</div>
                          </div>
                        </div>
                      </ResizableBox>
                    </div>
                  )
              )}

              <Page key={`page_${currentPage}`} pageNumber={currentPage} />
            </div>
          </Document>
        </div>
        <div className="mt-7 flex gap-40 items-center  justify-center">
          <button
            className={`px-6 py-2 mr-2 rounded-md ${
              currentPage === 1
                ? "bg-rose-700 text-white cursor-not-allowed"
                : "bg-rose-500 text-white cursor-pointer"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p className="text-lg  text-white mx-4">
            Page {currentPage} of {numPages}
          </p>
          <button
            className={`px-6 py-2 rounded-md ${
              currentPage === numPages
                ? "bg-rose-700 text-white cursor-not-allowed"
                : "bg-rose-500 text-white cursor-pointer"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === numPages}
          >
            Next
          </button>
        </div>
      </div>

      <div
        style={{
          width: "50vw",
        }}
      >
        <Form
          childref={childref}
          childref1={childref1}
          childref2={childref2}
          childref3={childref3}
          childref4={childref4}
        />
      </div>
    </div>
  );
};