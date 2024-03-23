"use client";
import React, { FC, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import pdfFile from "./sow2.pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { RefObject } from "react";

import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
interface PdfViewerProps {
  parentRef: RefObject<HTMLDivElement>;
}
const PdfViewer: FC<PdfViewerProps> = ({ parentRef }) => {
  const [numPages, setNumPages] = useState<number>(0);
  //   useEffect(() => {
  //     console.log(pdfFile);
  //   }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (el, index) => (
        <div
          ref={parentRef}
          key={index}
          style={{ border: "1px solid orange", zIndex: 1000 }}
        >
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          <div>
            Page {index + 1} of {numPages}
          </div>
        </div>
      ))}

      <div></div>
    </Document>
  );
};

export default PdfViewer;
