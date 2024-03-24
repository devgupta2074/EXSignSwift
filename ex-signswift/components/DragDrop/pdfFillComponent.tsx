import React from "react";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import usePdfFileFromUrl from "@/app/utils/usePdfUrl";
import { useRef } from "react";
import { ReactNode } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import CustomSignatureCanvas from "../Signature/signatureCanvas";
import { DialogTrigger } from "../ui/dialog";
import CustomSignaturePad from "../Signature/signaturePad";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const PdfFillComponent = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = React.useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const [signedItems, setSignedItems] = useState<number[]>([]);
  const onSaveSignature = (signature: string) => {
    if (currentItemId === -1) {
      console.log("Something Wrong");
      return;
    }

    if (signedItems.includes(currentItemId)) {
      //remove logic
      let newCopiedItems = copiedItems.filter((item) => {
        if (item.id === currentItemId) {
          item.signature = "";
        }
        return item;
      });

      setCopiedItems(newCopiedItems);
      setSignedItems(signedItems.filter((id) => id !== currentItemId));

      return;
    }
    setSignedItems([...signedItems, currentItemId]);
    let newCopiedItems = copiedItems.filter((item) => {
      if (item.id === currentItemId) {
        item.signature = signature;
      }
      return item;
    });

    setCopiedItems(newCopiedItems);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  interface DroppedItem {
    id: number;
    left: number;
    top: number;
    width: number;
    height: number;
    pageNumber: number;
    text: string;
    icon: ReactNode;
    signature?: string;
  }

  //arr ->find if he ki nhi he ->sign use state

  const { pdfUrl, loading, error } = usePdfFileFromUrl(
    "https://pdf-lib.js.org/assets/with_update_sections.pdf"
  );
  const [currentItemId, setCurrentItemId] = useState<number>(-1);

  const copiedItem: DroppedItem[] = [
    {
      id: 0,
      text: "Signature",
      icon: "",
      width: 224,
      height: 96,
      left: 44,
      top: 78,
      pageNumber: 1,
    },
    {
      id: 1,
      text: "Signature",
      icon: "",
      width: 224,
      height: 96,
      left: 366,
      top: 28,
      pageNumber: 1,
    },
    {
      id: 2,
      text: "Date",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar "><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>',
      width: 224,
      height: 96,
      left: 374,
      top: 236,
      pageNumber: 1,
    },
    {
      id: 3,
      text: "Text",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text "><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>',
      width: 224,
      height: 96,
      left: 81,
      top: 309,
      pageNumber: 1,
    },
  ];
  const [copiedItems, setCopiedItems] = useState<DroppedItem[]>(copiedItem);

  const handleSign = (itemId: number) => {
    if (signedItems.includes(itemId)) {
      //remove logic
      let newCopiedItems = copiedItems.filter((item) => {
        if (item.id === itemId) {
          item.signature = "";
        }
        return item;
      });

      setCopiedItems(newCopiedItems);
      setSignedItems(signedItems.filter((id) => id !== itemId));

      return;
    }
    setOpen(true);
    setCurrentItemId(itemId);
  };
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
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <div
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
                      onClick={() => handleSign(item.id)}
                      key={indx}
                      style={{
                        width: item.width,
                        height: item.height,
                        left: item.left,
                        top: item.top,
                        position: "absolute",
                        borderRadius: "0.5rem",
                        zIndex: 50,
                        color: "white",
                        fontWeight: "500",
                      }}
                      className="bg-rose-500  cursor-pointer hover:bg-rose-700"
                    >
                      {item.signature ? (
                        <div className="relative shadow-xl">
                          <div className="hover:backdrop-blur-md absolute inset-0 flex justify-center items-center z-50  border-gray-200  rounded-md shadow-md">
                            <div className="text-rose-500 text-xs opacity-0 transition-opacity duration-300 hover:opacity-100 w-full h-full flex justify-center items-center">
                              Remove
                            </div>
                          </div>
                          <img
                            src={item.signature}
                            className="h-full w-full object-contain dark:invert bg-white border-2 border-gray-200  rounded-md shadow-md"
                          />
                        </div>
                      ) : (
                        <>
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
                            }}
                          >
                            <div className="flex gap-5">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.icon || "",
                                }}
                              ></div>
                              <div>{item?.text}</div>
                            </div>
                          </div>
                        </>
                      )}
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
        <div>
          <CustomSignaturePad
            open={open}
            setOpen={setOpen}
            onSaveSignature={onSaveSignature}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfFillComponent;
