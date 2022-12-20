import { useEffect } from "react";
import { errorNotify } from "../../components";
import { useDragAndDrop } from "../../Hooks";
import { getBase64 } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { setFileDataArray } from "../../store/fileSliceArray";

import "./viewer.scss";
import { PdfAction } from "../../components/PdfViewer/PdfAction";
import PdfActionViewerProvider from "../../components/PdfViewer/PdfActionHook";
import WaterMark from "./WaterMark";

const DragArea = ({ children }) => {
  const [elementRef, error, dragging, data] = useDragAndDrop(["pdf", "PDF"]);

  // Store
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.fileArray);

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
          dispatch(
            setFileDataArray({ lastModified, name, size, type, base64: b64 })
          );
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
    <PdfActionViewerProvider>
      <div
        className={`viewer-wrapper w-viewer-md lg:w-viewer`}
        ref={elementRef}
      >
        {dragging && <div className="drop-over-popup dashed-anime" />}
        {fileData.length !== 0 ? (
          <>
            <div className="w-4/5 max-w-[500px] h-9 bottom-4 left-1/2 -translate-x-1/2 absolute bg-slate-900 px-2 z-50 rounded-sm ">
              <PdfAction />
            </div>
            {children}
          </>
        ) : (
          <WaterMark isDragging={dragging} />
        )}
      </div>
    </PdfActionViewerProvider>
  );
};

export default DragArea;
