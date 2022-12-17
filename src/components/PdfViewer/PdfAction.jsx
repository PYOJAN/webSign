import { usePdfViewerAction, pdfActions } from "./PdfActionHook";
import { Tooltip, Button, Input } from "../";

import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsZoomOut,
  BsZoomIn,
  BsThreeDotsVertical,
  AiOutlineDownload,
} from "../../assets";

export const PdfAction = () => {
  const [state, dispatch] = usePdfViewerAction();
  const { totalPages, currentPage} = state;

  return (
    <div className="w-4/5 max-w-[500px] bottom-4 left-1/2 -translate-x-1/2 absolute bg-teal-900/80 z-50 h-12 flex flex-row justify-between px-2">
      {/* page next previous */}
      <div className="page_handle inline-flex gap-1 h-full items-center">
        <Tooltip label="Previous page">
          <Button
            variant="SECONDARY"
            size="SMALL"
            className=" hover:bg-slate-500 text-slate-600 hover:text-slate-400"
          >
            <BsFillArrowUpCircleFill className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>

        <div className=" inline-flex items-center">
          <Input
            className="w-10 rounded border-[0.5px] text-center"
            placeholder=""
            value={Number(currentPage)}
          />
          <span className=" text-lg text-sky-700 inline-flex whitespace-nowrap ml-2">
            / {totalPages}
          </span>
        </div>

        <Tooltip label="Next page">
          <Button
            variant="SECONDARY"
            size="SMALL"
            className=" hover:bg-slate-500 text-slate-600 hover:text-slate-400"
          >
            <BsFillArrowDownCircleFill className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
      </div>
      {/* Page Zoom control */}
      <div className="zoom_in_out inline-flex h-full items-center gap-2 ">
        <Tooltip label="Zoom out">
          <Button
            onClick={() => dispatch({ action: pdfActions.ZOOM_OUT })}
            variant="SECONDARY"
            size="SMALL"
            className=" hover:bg-slate-500 text-slate-600 hover:text-slate-400"
          >
            <BsZoomOut className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
        <Tooltip label="Zoom in">
          <Button
            onClick={() => dispatch({ action: pdfActions.ZOOM_IN })}
            variant="SECONDARY"
            size="SMALL"
            className=" hover:bg-slate-500 text-slate-600 hover:text-slate-400"
          >
            <BsZoomIn className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
      </div>
      {/* More actions */}
      <div className="more_actions inline-flex gap-1 h-full items-center">
        <Tooltip label="Save file">
          <Button
            variant="SECONDARY"
            size="SMALL"
            className=" p-1 hover:bg-slate-500 text-slate-600 hover:text-slate-400"
          >
            <AiOutlineDownload className=" text-xl font-bold" />
          </Button>
        </Tooltip>
        <Tooltip label="More">
          <Button
            variant="SECONDARY"
            size="SMALL"
            className=" p-1 hover:bg-slate-500 text-slate-400 hover:text-slate-400"
          >
            <BsThreeDotsVertical className=" text-xl" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
