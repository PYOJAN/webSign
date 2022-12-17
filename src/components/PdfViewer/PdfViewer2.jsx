import { useState, useEffect } from "react";

// react-pdf library imports
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `/react-pdf/worker.min.js`; // public/react-pdf/worker.min.js
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import PdfViewerProvider from "./PdfActionHook";

// custom css
import "./pdfViewer.scss";

import { PdfAction } from "./PdfAction";

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // handle canvas click
  const handleCanvasClick = (e) => {
    console.log(e);
    const c = e.target;
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 300),
      40,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  };

  // Attaching click event when canvas rendered
  useEffect(() => {
    setTimeout(() => {
    console.log("event attach");
    document.querySelectorAll("canvas").forEach((can) => {
      can.addEventListener("click", handleCanvasClick, false);
    });
    }, 500);

    setTimeout(() => {
    return () =>
      document.querySelectorAll("canvas").forEach((can) => {
        can.removeEventListener("click", handleCanvasClick, false);
      });
    }, 500);
  }, [file]);

  return (
    <PdfViewerProvider>
      <div className={`pdf-action-btn`}>
        <PdfAction />
      </div>

      <div className={`viewer grid`}>
        <Document
          file={file}
          onSourceError={(err) => console.log("error with file source" + err)}
          onLoadError={(err) => console.log(err)}
          noData={() => (
            <h1 className="text-red-500">File data is not provided</h1>
          )}
          error={() => (
            <strong className="text-rose-800">An error occurred!</strong>
          )}
          onLoadSuccess={onDocumentLoadSuccess}
          onPassword={(callback) => callback(prompt("enter PDF password:", ""))}
          externalLinkTarget="_blank"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={1}
              onLoadError={(err) => console.log(err)}
              onLoadSuccess={() => console.log("page loaded")}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>
    </PdfViewerProvider>
  );
}

export default PdfViewer;
