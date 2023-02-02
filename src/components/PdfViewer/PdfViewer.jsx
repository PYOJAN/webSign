// react-pdf library imports
import { useCallback, useEffect, useMemo, useRef } from "react";
import { pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/worker/worker.min.js"; // public/react-pdf/worker.min.js
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { usePdfViewerAction, pdfActions } from "./";
import PdfPage from "./PdfPage";

// custom css
import "./pdfViewer.scss";

const PdfViewer = ({ file }) => {
  const [_, dispatch] = usePdfViewerAction();
  const { totalPages } = file;

  function onDocumentLoadSuccess(dataLoad) {
    dispatch({
      action: pdfActions.TOTAL_PAGE,
      data: {
        id: file.id,
        totalPages: dataLoad.numPages,
      },
    });
  }

  function onPassword(callback, reason) {
    console.log(reason);
    function callbackProxy(password) {
      // Cancel button handler
      if (password === null) {
        // Reset your `document` in `state`, un-mount your `<Document />`, show custom message, whatever
        return console.log("user cancel");
      }

      callback(password);
    }

    switch (reason) {
      case 1: {
        const password = prompt("Enter the password to open this PDF file.");
        callbackProxy(password);
        break;
      }
      case 2: {
        const password = prompt("Invalid password. Please try again.");
        callbackProxy(password);
        break;
      }
      default:
    }
  }

  return (
    <div
      className={`viewer ${file.isActive ? "d-Grid" : "d-None"}`}
      data-doc-id={file.id}
    >
      <Document
        file={file.base64}
        onLoadSuccess={onDocumentLoadSuccess}
        // rotate={rotation}
        onSourceError={(err) => console.log("error with file source" + err)}
        onLoadError={(err) => console.log("onLoadError:-", err.message)}
        noData={() => (
          <h1 className="text-red-500">File data is not provided</h1>
        )}
        error={() => (
          <strong className="text-rose-800">An error occurred!</strong>
        )}
        onPassword={onPassword}
        externalLinkTarget="_blank"
      >
        {Array.from(new Array(totalPages), (_, index) => (
          <PdfPage
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={file.scale}
            docId={file.id}
            pageWidth={file.pageWidth}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
