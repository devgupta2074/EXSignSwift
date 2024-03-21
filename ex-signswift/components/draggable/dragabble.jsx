"use client";

import React, { useState } from "react";

import { Viewer } from '@react-pdf-viewer/core';


import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


export default function DragAndDrop() {
  const [pdfFile, setPDFFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);

  function handleChange(event) {
    let selectedFile = event.target.files[0];
    const fileType = ["application/pdf"];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (event) => {
          setPDFFile(event.target.result);
        };
      }
      else {
        setPDFFile(null)
      }
    } else {
      console.log("PLease check ")
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if ((pdfFile) !== null) {
      setViewPdf(pdfFile)

    } else {
      setViewPdf(null)
    }
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <section className="dnd-main-sec">
      <div className="container">
        <div className="preview-side">
          <form>
            <input
              type="file"
              className="form-control"
              onChange={handleChange}
            />
            <button type="submit" className="btn " onChange={handleSubmit}>
              View Pdf
            </button>
          </form>
          <h2>View Pdf</h2>

          <div className="pdf-container">
            <Viewer
              fileUrl='/assets/pdf-open-parameters.pdf'
              plugins={[
                // Register plugins
                defaultLayoutPluginInstance,

              ]}
            />
          </div>
        </div>
        <div className="drag-features"></div>
      </div>
    </section>
  );
}
