import { useEffect, useMemo } from "react";
import { errorNotify } from "../../components";
import { useDragAndDrop } from "../../Hooks";
import { getBase64 } from "../../utils";

import {
  pdfActions,
  PdfAction,
  usePdfViewerAction,
} from "../../components/PdfViewer";

import "./viewer.scss";
import WaterMark from "./WaterMark";
// import { PdfAction } from "../../components/PdfViewer";

const DragArea = ({ children }) => {
  const [elementRef, error, dragging, data] = useDragAndDrop(["pdf", "PDF"]);

  const [selectedFiles, actionDispatch] = usePdfViewerAction();
  const filesData = selectedFiles;

  // monitoring drag and drop file and updating state
  useEffect(() => {
    const loadData = async () => {
      try {
        // Handling file from drop down
        if (error?.status) return errorNotify(error?.message);

        if (data && data?.size) {
          const { lastModified, name, size, type } = data;
          // converting pdf to base64
          const b64 = await getBase64(data);

          actionDispatch({
            action: pdfActions.NEW_FILE_ADD,
            data: { lastModified, name, size, type, base64: b64 },
          });
        }
      } catch (err) {
        console.log(err);
        errorNotify(
          <span>
            <strong>Unable to process</strong>,<br />
            please refresh the page and try again.
          </span>
        );
      }
    };

    loadData();
  }, [data, error]);

  return (
    <div className={`viewer-wrapper w-viewer-md lg:w-viewer`} ref={elementRef}>
      {dragging && <div className="drop-over-popup dashed-anime" />}
      {filesData.length !== 0 ? (
        <>
          <div className=" absolute left-1/2 -translate-x-1/2 bottom-5 w-4/5 h-10 px-2 bg-slate-800 z-20">
            <PdfAction />
          </div>
          {children}
        </>
      ) : (
        <WaterMark isDragging={dragging} />
      )}
    </div>
  );
};

export default DragArea;
