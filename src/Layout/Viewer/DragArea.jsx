import { useRef, useEffect } from "react";
import { Button, errorNotify } from "../../components";
import { useDragAndDrop } from "../../Hooks";
import { fileHandle, getBase64 } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { setFileDataArray } from "../../store/fileSliceArray";

import "./viewer.scss";
import { PdfAction } from "../../components/PdfViewer/PdfAction";
import PdfActionViewerProvider from "../../components/PdfViewer/PdfActionHook";

const DragArea = ({ children }) => {
  const [elementRef, error, dragging, data] = useDragAndDrop(["pdf", "PDF"]);
  const fileInputRef = useRef();

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

  // Handling file from selection
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Processing file and get base64 data or error
      const fileProcessedData = await fileHandle(e);

      // If error accrued
      if (fileProcessedData?.status)
        return errorNotify(fileProcessedData?.message);

      dispatch(setFileDataArray(fileProcessedData));
    }
  };

  return (
    <PdfActionViewerProvider>
      <div
        className={`viewer-wrapper w-viewer-md lg:w-viewer`}
        ref={elementRef}
      >
        {dragging && <div className="drop-over-popup dashed-anime" />}
        {fileData.length !== 0 ? (
          <>
            <PdfAction />
            {children}
          </>
        ) : (
          <div className="watermark select-none">
            <h1>
              Drag and your file here start signing.
              <p className="text-base font-semibold dark:text-slate-700">
                Only single PDF file is allowed.
              </p>
            </h1>

            <input
              type="file"
              onChange={handleChange}
              className="hidden"
              ref={fileInputRef}
              accept="application/pdf"
            />

            <Button
              size="BIG"
              variant="OUTLINE"
              className={`capitalize ${dragging ? "pointer-events-none" : ""}`}
              onClick={() => fileInputRef.current.click()}
            >
              Import from computer
            </Button>
          </div>
        )}
      </div>
    </PdfActionViewerProvider>
  );
};

export default DragArea;
