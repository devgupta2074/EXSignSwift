"use client";
import React, { FC, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdfFile from "./sow2.pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { RefObject } from "react";

import { useState } from "react";
import usePdfFileFromUrl from "@/app/utils/usePdfUrl";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
interface PdfViewerProps {
  parentRef?: RefObject<HTMLDivElement>;
  pdfurl: string;
}
const PdfViewer: FC<PdfViewerProps> = ({ parentRef, pdfurl }) => {
  const [numPages, setNumPages] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  //   useEffect(() => {
  //     console.log(pdfFile);
  //   }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const { pdfUrl, loading, error } = usePdfFileFromUrl(
    "https://pdf-lib.js.org/assets/with_update_sections.pdf"
  );
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
          <Document file={pdfurl} onLoadSuccess={onDocumentLoadSuccess}>
            <div
              ref={parentRef}
              style={{ border: "2px solid green", position: "relative" }}
            >
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
    </div>
  );
};

export default PdfViewer;
