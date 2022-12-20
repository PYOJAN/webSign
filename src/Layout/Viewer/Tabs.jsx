import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisible, closeTab } from "../../store/fileSliceArray";
import { VscClose } from "react-icons/vsc";
import { Button, Tooltip } from "../../components";

const Tabs = () => {
  // Store
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.fileArray);

  const handleTabClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // Stope event propagation to parent element
    dispatch(setVisible({ id: e.target.dataset.pdf }));
  };

  const handleCloseTab = (e) => {
    console.log(e.target);
    if (e && e.stopPropagation) e.stopPropagation(); // Stope event propagation to parent element
    dispatch(closeTab({ id: e.target.dataset.pdf }));
  };

  return (
    // .pdf-action-btn is in /components/PdfViewer/pdfViewer.scss
    <div className="pdf-action-btn flex flex-row px-1">
      {fileData.map((file, i) => (
        <div
          data-pdf={file.id}
          key={`tab-${i}`}
          className={`${
            file.isActive
              ? "bg-slate-900 "
              : "bg-transparent hover:bg-slate-600"
          } text-slate-400 mt-auto pr-5 relative min-w-[80px] max-w-[210px] h-[95%] flex flex-row items-center rounded-t-md px-1`}
          onClick={handleTabClick}
        >
          <small className=" w-11/12 text-xs select-none whitespace-nowrap overflow-hidden pointer-events-none">
            {file.name}
          </small>
          <Tooltip label="Close tab" space={15}>
            <Button
              onClick={handleCloseTab}
              data-pdf={file.id}
              variant="SECONDARY"
              size="SMALL"
              className="w-5 h-5 p-0 rounded-full absolute right-1 hover:bg-rose-600/40"
            >
              <VscClose className="pointer-events-none" />
            </Button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
