import { PdfViewer } from "../../components";
import DragArea from "./DragArea";

import { usePdfViewerAction } from "../../components/PdfViewer";

import "./viewer.scss";
import Tabs from "./Tabs";

const Viewer = () => {
  const [selectedFiles, _] = usePdfViewerAction();
  const filesData = selectedFiles;

  return (
    <DragArea>
      <Tabs />
      {filesData.map((file, i) => (
        <PdfViewer key={`tab_number_${i}`} file={file} />
      ))}
    </DragArea>
  );
};

export default Viewer;
