import { pdfActions, usePdfViewerAction } from "./";
import { Tooltip, Button, Input } from "../";

import { BsIcon, AiIcon } from "../../assets";
import { useCallback, useMemo } from "react";

const PAGE_CHANGE_TYPE = {
  PREVIOUS: "PREVIOUS",
  NEXT: "NEXT",
  CUSTOM: "CUSTOM",
};

export const PdfAction = () => {
  const [state, dispatch] = usePdfViewerAction();

  const documentId = useMemo(
    () => state.filter((doc) => doc.isActive)[0],
    [state]
  );

  const viewerScrollTo = useCallback(
    (type, element = null) => {
      const viewer = document.querySelector(`[data-doc-id]`);
      const singlePageHeight = document.querySelector(
        ".react-pdf__Page__canvas"
      ).offsetHeight;

      let scroll;

      const TYPE = PAGE_CHANGE_TYPE[type];
      switch (TYPE) {
        case PAGE_CHANGE_TYPE.NEXT:
          scroll = singlePageHeight * documentId.currentPage;
          break;
        case PAGE_CHANGE_TYPE.PREVIOUS:
          scroll = viewer.scrollTop - singlePageHeight;
          break;
        default:
          break;
      }

      viewer.scrollTo({
        top: scroll,
        behavior: "smooth",
      });
    },
    [state]
  );

  return (
    <div className="w-full h-full flex justify-between">
      {/* page next previous */}
      <div className="h-full flex flex-row items-center gap-2">
        <ActionButton
          tooltip="Previous Page"
          onClick={() => viewerScrollTo(PAGE_CHANGE_TYPE.PREVIOUS)}
        >
          <BsIcon.BsFillArrowLeftCircleFill />
        </ActionButton>
        <div className="w-14 h-full inline-flex items-center">
          <Input
            value={documentId.currentPage}
            disabled={true}
            placeholder=""
            autoComplete="off"
            className="border-0 border-b-2 bg-slate-900 hover:bg-slate-800 w-6 h-6 text-center"
          />
          <Tooltip label="Total Pages" space={8} placement="top">
            <p className=" whitespace-nowrap text-slate-600 font-bold">
              / <span>{documentId.totalPages}</span>
            </p>
          </Tooltip>
        </div>
        <ActionButton
          tooltip="Next Page"
          onClick={() => viewerScrollTo(PAGE_CHANGE_TYPE.NEXT)}
        >
          <BsIcon.BsFillArrowRightCircleFill />
        </ActionButton>
      </div>
      {/* Page Zoom control */}
      <div className="h-full flex flex-row items-center gap-2">
        <ActionButton
          tooltip="Zoom Out"
          onClick={() =>
            dispatch({
              action: pdfActions.ZOOM_OUT,
              data: { id: documentId.id },
            })
          }
        >
          <AiIcon.AiOutlineZoomOut />
        </ActionButton>

        <ActionButton
          tooltip="Zoom In"
          onClick={() =>
            dispatch({
              action: pdfActions.ZOOM_IN,
              data: { id: documentId.id },
            })
          }
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
    <Tooltip label={tooltip} space={8} placement="top">
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
