import { useState, useCallback, useEffect, useRef } from "react";
import { usePdfViewerAction, pdfActions } from "./PdfActionHook";

import { Page } from "react-pdf";

const PdfPage = ({ pageNumber, ...restProps }) => {
  const canvasRef = useRef();
  const [pageLoadedSuccessFull, setPageLoadedSuccessFull] = useState(false);
  const [state, dispatch] = usePdfViewerAction();
  const { scale, pageWidth } = state;

  const [isStart, setStart] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [mouse, setMouse] = useState({
    X: 0,
    Y: 0,
  });

  // ==================================
  // Intersection Observer
  const onIntersectionChange = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch({
          action: pdfActions.CURRENTcanvas,
          data: { currentPage: pageNumber },
        });
      }
    },
    [pageNumber, canvasRef.current, scale, pageLoadedSuccessFull]
  );

  useEffect(() => {
    canvasRef.current &&
      new IntersectionObserver(onIntersectionChange, {
        threshold: 0.3,
        root: null,
        rootMargin: "0px",
      }).observe(canvasRef.current);
  }, [pageNumber, canvasRef.current, scale, pageLoadedSuccessFull]);
  // ========================================

  const drawStart = useCallback(
    (e) => {
      prevent(e);
      // Getting offset of the canvas
      const { X, Y, rect } = elementOffset(e);
      const ctx = e.target.getContext("2d");
      const dpi = window.devicePixelRatio;
      const _pageData =
        !pageData &&
        ctx.getImageData(0, 0, rect.width * dpi, rect.height * dpi);
      if (!pageData) setPageData(_pageData);
      setMouse({ X, Y,});
      setStart(true);
    },
    [pageData]
  );

  const drawMove = useCallback(
    (e) => {
      prevent(e);
      if (isStart) {
        // Getting offset of the canvas
        const { X, Y, rect } = elementOffset(e);
        const ctx = e.target.getContext("2d");

        // console.log(e.nativeEvent.offsetX)

        // Resetting canvas data
        ctx.clearRect(0, 0, pdiValue(rect.width), pdiValue(rect.height));
        // Putting PDF Data on the canvas
        ctx.putImageData(pageData, 0, 0);

        const sX = mouse.X;
        const sY = mouse.Y;
        const width = X - mouse.X;
        const height = Y - mouse.Y;
        ctx.strokeRect(sX, sY, width, height);

        const DPI = window.devicePixelRatio;
        console.log({sX, scale, DPI});
      }
    },
    [isStart]
  );

  const drawStop = useCallback((e) => {
    setStart(false);
    setMouse({ X: 0, Y: 0 });
  }, []);

  const onPageLoadSuccess = (e) => {
    setPageLoadedSuccessFull(true)
  }

  return (
    <Page
      scale={scale}
      width={pageWidth}
      canvasRef={canvasRef}
      pageNumber={pageNumber}
      onLoadSuccess={onPageLoadSuccess}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      {...restProps}
      onMouseDown={drawStart}
      onMouseUp={drawStop}
      onMouseMove={drawMove}
    />
  );
};

// Helpers function
const elementOffset = (element) => {
  // Get the bounding rectangle of target
  const target = element.target;
  const rect = target.getBoundingClientRect();


  // device devicePixelRatio
  const DPI = window.devicePixelRatio;
  // Mouse position
  const X = parseInt((element.clientX - rect.left) * DPI);
  const Y = parseInt((element.clientY - rect.top) * DPI);

  return { X, Y, rect };
};
// Preventing Defaults
const prevent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

// DPI maintain
const pdiValue = (value) => {
  const pdi = window.devicePixelRatio;

  return pdi * value;
};

export default PdfPage;
