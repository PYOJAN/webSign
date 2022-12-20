import { usePdfViewerAction, pdfActions } from "./PdfActionHook";
import { Tooltip, Button, Input } from "../";

import { BsIcon, AiIcon } from "../../assets";

export const PdfAction = () => {
  const [state, dispatch] = usePdfViewerAction();
  const { totalPages, currentPage } = state;

  return (
    <div className="w-full h-full flex justify-between">
      {/* page next previous */}
      <div className="h-full flex flex-row items-center gap-2">
        <ActionButton tooltip="Previous Page">
          <BsIcon.BsFillArrowLeftCircleFill />
        </ActionButton>
        <div className="w-14 h-full inline-flex items-center">
          <Tooltip label="Current page" space={8}>
            <Input
              value={currentPage}
              placeholder=""
              autoComplete="off"
              className="border-0 border-b-2 bg-slate-900 hover:bg-slate-800 w-6 h-6 text-center"
            />
          </Tooltip>
          <Tooltip label="Total Pages" space={8}>
            <p className=" whitespace-nowrap text-slate-600 font-bold">
              / <span>{totalPages}</span>
            </p>
          </Tooltip>
        </div>
        <ActionButton tooltip="Next Page">
          <BsIcon.BsFillArrowRightCircleFill />
        </ActionButton>
      </div>
      {/* Page Zoom control */}
      <div className="h-full flex flex-row items-center gap-2">
        <ActionButton
          tooltip="Zoom Out"
          onClick={() => dispatch({ action: pdfActions.ZOOM_OUT })}
        >
          <AiIcon.AiOutlineZoomOut />
        </ActionButton>

        <ActionButton
          tooltip="Zoom In"
          onClick={() => dispatch({ action: pdfActions.ZOOM_IN })}
        >
          <AiIcon.AiOutlineZoomIn />
        </ActionButton>
      </div>
      {/* More actions */}
      <div className="h-full flex flex-row items-center gap-2">
        <ActionButton tooltip="File Properties">
          <BsIcon.BsFillInfoCircleFill />
        </ActionButton>
        <ActionButton tooltip="More">
          <BsIcon.BsThreeDotsVertical />
        </ActionButton>
      </div>
    </div>
  );
};

const ActionButton = ({ tooltip, onClick, children }) => {
  return (
    <Tooltip label={tooltip} space={8}>
      <Button
        variant="SECONDARY"
        size="SMALL"
        onClick={onClick}
        className="text-slate-700 hover:text-slate-400 hover:bg-slate-400/50 p-1 rounded-sm"
      >
        {children}
      </Button>
    </Tooltip>
  );
};
