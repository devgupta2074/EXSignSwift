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
  url: string;
}
const PdfViewer: FC<PdfViewerProps> = ({ url }) => {
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

  const { pdfUrl, loading, error } = usePdfFileFromUrl(
    "https://pdf-lib.js.org/assets/with_update_sections.pdf"
  );
  return (
    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (el, index) => (
        <div key={index} style={{ border: "1px solid orange", zIndex: 1000 }}>
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          <div>
            Page {index + 1} of {numPages}
          </div>
        </div>
      ))}

      <div className="mt-7 flex flex-row gap-40 items-center  justify-center">
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
    </Document>
  );
};

export default PdfViewer;
