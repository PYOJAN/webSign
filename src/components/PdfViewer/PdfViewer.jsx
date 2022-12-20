import { useCallback, useRef, useState, useMemo, useEffect } from "react";

// react-pdf library imports
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/worker/worker.min.js"; // public/react-pdf/worker.min.js
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  usePdfViewerAction,
  pdfActions,
  useIntersectionObserver,
} from "./PdfActionHook";

// custom css
import "./pdfViewer.scss";

const PdfViewer = ({ file }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(0);

  const [state, dispatch] = usePdfViewerAction();
  const { scale, totalPages, rotation, currentPage, pageWidth } = state;

  const rootViewer = useRef();
  const viewerRef = useRef();

  function onDocumentLoadSuccess(dataLoad) {
    // setNumPages(dataLoad.numPages);
    dispatch({
      action: pdfActions.TOTAL_PAGE,
      data: { pages: dataLoad.numPages },
    });
  }

  // handle canvas click
  const handleCanvasClick = (e) => {
    const c = e.target;
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(e.screenX, e.screenY, 40, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const handleScroll = useCallback(
    (event) => {
      if (viewerRef.current) {
        const rootViewer = event.target.getBoundingClientRect();
        const onePageHeight = viewerRef?.current?.getBoundingClientRect();
      }
    },
    [viewerRef, totalPages]
  );

  return (
    <>
      {file.isActive ? (
        <div className={`viewer`} ref={rootViewer} onScroll={handleScroll}>
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
            inputRef={viewerRef}
          >
            {Array.from(new Array(totalPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                onClick={handleCanvasClick}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                onMouseMove={() => {
                  mouseDown && console.log("mouseMove");
                }}
                scale={scale}
                onLoadError={(err) => console.log(err)}
                onLoadSuccess={(e) => setPageLoaded(e._pageIndex + 1)}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                // inputRef={pageRef}
              />
            ))}
          </Document>
        </div>
      ) : null}
    </>
  );
};

export default PdfViewer;
