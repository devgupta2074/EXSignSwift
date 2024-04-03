"use client";
import React, { FC, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Skeleton } from "@/components/ui/skeleton";

import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

import "react-pdf/dist/Page/TextLayer.css";
import { RefObject } from "react";

import { useState } from "react";
import usePdfFileFromUrl from "@/app/utils/usePdfUrl";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
interface IField {
  id: number;
  secondaaryId: string;
  left: string;
  top: string;
  width: string;
  height: string;
  page: number;
  text: string;
  icon: string;
  recipientId: string;
}
interface PdfViewerProps {
  url: string;
  copiedItems?: IField[];
}

const PdfViewer: FC<PdfViewerProps> = ({ url, copiedItems }) => {
  console.log("copied Items", copiedItems);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  //   useEffect(() => {
  //     console.log(pdfFile);
  //   }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const { pdfUrl, loading, error } = usePdfFileFromUrl(url);

  // if (loading) {
  //   return <Skeleton className="h-96 w-full" />;
  // }

  return (
    <div className=" h-screen">
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <div
          style={{
            position: "relative",
          }}
          className="border-2 border-rose-500 rounded-md overflow-y-scroll h-[35rem]"
        >
          {copiedItems?.map(
            (item, indx) =>
              item.page === currentPage && (
                <div
                  key={indx}
                  style={{
                    width: parseInt(item.width),
                    height: parseInt(item.height),
                    left: parseInt(item.left),
                    top: parseInt(item.top),
                    position: "absolute",
                    borderRadius: "0.5rem",
                    zIndex: 1000,
                    fontWeight: "500",
                  }}
                  className="bg-white text-gray-700 border-2 border-gray-200  rounded-md shadow-md flex justify-center items-center cursor-pointer"
                >
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      width: parseInt(item.width),
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: parseInt(item.height),
                      textAlign: "center",
                      zIndex: 1200,
                    }}
                  >
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <div className="flex gap-5">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.icon || "",
                          }}
                        ></div>
                        <div>{item?.text}</div>
                      </div>
                      <div className="text-xs text-center">
                        {item?.recipientId}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}

          <Page key={`page_${currentPage}`} pageNumber={currentPage} />
        </div>
      </Document>

      <div className="mt-4 flex flex-row gap-40 items-center  justify-center">
        <button
          className={`px-6 py-2 mr-2 rounded-md ${
            currentPage === 1
              ? "bg-rose-700 text-white cursor-not-allowed"
              : "bg-rose-500 text-white cursor-pointer"
          }`}
          onClick={handlePrevPage}
          type="button"
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
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
