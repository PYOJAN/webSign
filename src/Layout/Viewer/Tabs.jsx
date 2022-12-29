import { pdfActions, usePdfViewerAction } from "../../components/PdfViewer";
import { VscClose } from "react-icons/vsc";
import { Button, Tooltip } from "../../components";

const Tabs = () => {
  const [selectedFiles, actionDispatch] = usePdfViewerAction();
  const filesData = selectedFiles;

  const handleTabClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // Stope event propagation to parent element
    actionDispatch({
      action: pdfActions.CHANGE_TAB,
      data: { id: e.target.dataset.pdf },
    });
  };

  const handleCloseTab = (e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // Stope event propagation to parent element
    actionDispatch({
      action: pdfActions.CLOSE_TAB,
      data: { id: e.target.dataset.pdf },
    });
  };

  return (
    // .pdf-action-btn is in /components/PdfViewer/pdfViewer.scss
    <div className="pdf-action-btn flex flex-row px-1">
      {filesData.map((_file, i) => (
        <div
          data-pdf={_file.id}
          key={`tab-${i}`}
          className={`${
            _file.isActive
              ? "bg-slate-900 "
              : "bg-transparent hover:bg-slate-600"
          } text-slate-400 mt-auto pr-5 relative min-w-[80px] max-w-[210px] h-[95%] flex flex-row items-center rounded-t-md px-1`}
          onClick={handleTabClick}
        >
          <small className=" w-11/12 text-xs select-none whitespace-nowrap overflow-hidden pointer-events-none">
            {_file.name}
          </small>
          <Tooltip label="Close tab" space={15}>
            <Button
              onClick={handleCloseTab}
              data-pdf={_file.id}
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
