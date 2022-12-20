// react-pdf library imports
import { pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/worker/worker.min.js"; // public/react-pdf/worker.min.js
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { usePdfViewerAction, pdfActions } from "./PdfActionHook";
import PdfPage from "./PdfPage";

// custom css
import "./pdfViewer.scss";

const PdfViewer = ({ file }) => {
  const [state, dispatch] = usePdfViewerAction();
  const { totalPages, rotation } = state;

  function onDocumentLoadSuccess(dataLoad) {
    dispatch({
      action: pdfActions.TOTAL_PAGE,
      data: { pages: dataLoad.numPages },
    });
  }

  return (
    <>
      {file.isActive ? (
        <div className={`viewer`}>
          <Document
            file={file.base64}
            onLoadSuccess={onDocumentLoadSuccess}
            rotate={rotation}
            onSourceError={(err) => console.log("error with file source" + err)}
            onLoadError={(err) => console.log(err)}
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
              <PdfPage key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      ) : null}
    </>
  );
};

export default PdfViewer;
