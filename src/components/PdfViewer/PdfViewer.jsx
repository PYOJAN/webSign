// react-pdf library imports
import { useMemo } from "react";
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

  const BASE_64 = useMemo(() => file.base64, [file]);
  return (
    <>
      {file.isActive ? (
        <div className={`viewer`}>
          <Document
            file={BASE_64}
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
            onPassword={(callback) =>
              callback(prompt("enter PDF password:", ""))
            }
            externalLinkTarget="_blank"
          >
            {Array.from(new Array(totalPages), (_, index) => (
              <PdfPage
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={file.scale}
                pageWidth={file.pageWidth}
              />
            ))}
          </Document>
        </div>
      ) : null}
    </>
  );
};

export default PdfViewer;
