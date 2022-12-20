import { PdfViewer } from "../../components";
import DragArea from "./DragArea";

import { useSelector } from "react-redux";

import "./viewer.scss";
import Tabs from "./Tabs";

const Viewer = () => {
  // Store
  const fileData = useSelector((state) => state.fileArray);

  return (
    <DragArea>
      <Tabs />
      {fileData.map((file, i) => (
        <PdfViewer key={`tab_number_${i}`} file={file} />
      ))}
    </DragArea>
  );
};

export default Viewer;
