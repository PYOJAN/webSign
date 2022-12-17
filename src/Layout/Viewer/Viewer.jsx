import { PdfViewer } from "../../components";
import DragArea from "./DragArea";

import { useDispatch, useSelector } from "react-redux";
import { setVisible, closeTab } from "../../store/fileSliceArray";

import "./viewer.scss";

const Viewer = () => {
  // Store
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.fileArray);

  const handleTabClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // Stope event propagation to parent element
    dispatch(setVisible({ id: e.target.dataset.pdf }));
  };

  const handleCloseTab = (e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // Stope event propagation to parent element
    dispatch(closeTab({ id: e.target.dataset.pdf }));
  };

  return (
      <DragArea>
        <div className="pdf-tabs pdf-action-btn flex flex-row gap-2">
          {fileData.map((file, i) => (
            <div
              data-pdf={file.id}
              key={`tab-${i}`}
              className="bg-rose-300 min-w-[80px] max-w-[230px] w-[230px] h-[95%] flex flex-row justify-around items-center "
              onClick={handleTabClick}
            >
              <p className=" max-w-[150px] whitespace-nowrap overflow-hidden pointer-events-none">
                {file.name}
              </p>
              <button
                data-pdf={file.id}
                className="w-11 h11 bg-rose-500 rounded-md"
                onClick={handleCloseTab}
              >
                X
              </button>
            </div>
          ))}
        </div>
        {fileData.map((file, i) => (
          <PdfViewer key={`tab_number_${i}`} file={file} />
        ))}
      </DragArea>
  );
};

export default Viewer;
