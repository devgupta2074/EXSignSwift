"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const usePdfFileFromUrl = (docurl: string) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  //s3 bucket url

  useEffect(() => {
    const fetchPdfFile = async () => {
      try {
        const response = await fetch(docurl);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF file");
        }
        const blob = await response.blob();
        setPdfUrl(URL.createObjectURL(blob));
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfFile();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [docurl]);

  return { pdfUrl, loading, error };
};

export default usePdfFileFromUrl;
