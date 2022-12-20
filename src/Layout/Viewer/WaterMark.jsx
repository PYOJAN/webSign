import { useRef } from "react";
import { Button, errorNotify } from "../../components";
import { fileHandle } from "../../utils";
import { useDispatch } from "react-redux";
import { setFileDataArray } from "../../store/fileSliceArray";

const WaterMark = ({ isDragging }) => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();

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
        className={`capitalize ${isDragging ? "pointer-events-none" : ""}`}
        onClick={() => fileInputRef.current.click()}
      >
        Import from computer
      </Button>
    </div>
  );
};

export default WaterMark;
