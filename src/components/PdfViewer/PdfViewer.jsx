import { useState } from "react";

// react-pdf library imports
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/worker/worker.min.js"; // public/react-pdf/worker.min.js
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { usePdfViewerAction, pdfActions } from "./PdfActionHook";

// custom css
import "./pdfViewer.scss";

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [state, dispatch] = usePdfViewerAction();
  const { scale, totalPages, rotation, currentPage, pageWidth } = state;

  function onDocumentLoadSuccess(dataLoad) {
    setNumPages(dataLoad.numPages);
    dispatch({
      action: pdfActions.TOTAL_PAGE,
      data: { pages: dataLoad.numPages },
    });
  }

  // handle canvas click
  const handleCanvasClick = (e) => {
    // console.log(e);
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

  return (
    <>
      {file.isActive ? (
        <div className={`viewer`}>
          <Document
            file={file.base64}
            onSourceError={(err) => console.log("error with file source" + err)}
            onLoadError={(err) => console.log(err)}
            noData={() => (
              <h1 className="text-red-500">File data is not provided</h1>
            )}
            error={() => (
              <strong className="text-rose-800">An error occurred!</strong>
            )}
            onLoadSuccess={onDocumentLoadSuccess}
            onPassword={(callback) =>
              callback(prompt("enter PDF password:", ""))
            }
            externalLinkTarget="_blank"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={currentPage}
                onClick={handleCanvasClick}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                onMouseMove={() => {
                  mouseDown && console.log("mouseMove");
                }}
                scale={scale}
                onLoadError={(err) => console.log(err)}
                onLoadSuccess={() => console.log("page loaded")}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
          </Document>
        </div>
      ) : null}
    </>
  );
};

export default PdfViewer;
