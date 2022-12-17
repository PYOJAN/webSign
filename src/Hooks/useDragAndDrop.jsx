import { useState, useRef, useEffect } from "react";
// import { getBase64 } from "../utils";

/**
 *
 * @param {Array} AllowedFilesArray
 * @returns [elementRef, error, dragging, data]
 * @description accept array of the allowed file type extension like ['pdf', 'xml']
 */
const useDragAndDrop = (AllowedFilesArray) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [data, setData] = useState({});
  const ref = useRef(null);

  // Helper function for file validation
  const isPdfFile = (files = []) => {
    return files.some(
      (file) =>
        !AllowedFilesArray.some((format) =>
          file.name.toLowerCase().endsWith(format?.toLowerCase())
        )
    );
  };

  const reset = () => {
    setData({});
    setError({ status: false, message: "" });
  };
  const prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // =================
  // Handling event when Drag Enter in
  const handleDragEnter = (e) => {
    prevent(e);
    reset(); // Clear previous error when new data enter in draggable zone

    if (e.target !== ref.current) setDragging(true);
  };
  const handleDragOver = (e) => {
    prevent(e);
    if (e.target) setDragging(true);
  };
  // Drag leave
  const handleDragLeave = (e) => {
    prevent(e);
    setDragging(false);
    setError({}); //  Clear previous error when user leaved draggable zone
  };

  const handleDrop = (e) => {
    prevent(e);

    // this is required to convert FileList object to array
    const files = [...e.dataTransfer.files];

    // check if the provided count prop is less than uploaded count of files
    if (files.length > 1) {
      setData({});
      setDragging(false);
      return setError({
        status: true,
        message: `Only ONE file is allowed.`,
      });
    }

    // check if some uploaded file is not in one of the allowed formats
    if (isPdfFile(files)) {
      setData({});
      setError({
        status: true,
        message: `Only [${AllowedFilesArray.join(
          ", "
        )}] file format are allowed:`,
      });
      setDragging(false);
      return;
    }

    // If everything is valid then return data
    if (files && files.length) setData(files[0]);

    setDragging(false);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("dragover", handleDragOver);
      ref.current.addEventListener("drop", handleDrop);
      ref.current.addEventListener("dragenter", handleDragEnter);
      ref.current.addEventListener("dragleave", handleDragLeave);

      return () => {
        ref.current.removeEventListener("dragover", handleDragOver);
        ref.current.removeEventListener("drop", handleDrop);
        ref.current.removeEventListener("dragenter", handleDragEnter);
        ref.current.removeEventListener("dragleave", handleDragLeave);
      };
    }
  }, []);
  // ====================

  return [ref, error, dragging, data];
};

export default useDragAndDrop;
