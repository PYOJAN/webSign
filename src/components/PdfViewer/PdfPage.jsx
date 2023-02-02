import { useState, useCallback, useEffect, useRef } from "react";
import { usePdfViewerAction } from "./PdfActionHook/PdfActionHook";

import { Page } from "react-pdf";
import { pdfActions } from "./PdfActionHook/constantValue";

// ! POST data
import { postData } from "./postData";
const DPI = 2;

const PdfPage = ({ pageNumber, scale, pageWidth, docId, ...restProps }) => {
  const canvasRef = useRef();
  const [pageLoadedSuccessFull, setPageLoadedSuccessFull] = useState(false);
  const [_, dispatch] = usePdfViewerAction();

  const [isStart, setStart] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [mouse, setMouse] = useState({
    X: 0,
    Y: 0,
  });
  const [coord, setCoord] = useState({
    X: null,
    Y: null,
    W: null,
    H: null,
  });

  // ==================================
  // Intersection Observer
  const onIntersectionChange = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch({
          action: pdfActions.CURRENT_PAGE,
          data: { currentPage: pageNumber, id: docId },
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
      const _pageData =
        !pageData &&
        ctx.getImageData(0, 0, pdiValue(rect.width), pdiValue(rect.height));
      if (!pageData) setPageData(_pageData);
      setMouse({ X, Y });
      setStart(true);
    },
    [pageData, scale]
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
        ctx.clearRect(0, 0, rect.width, rect.height);
        // Putting PDF Data on the canvas
        ctx.putImageData(pageData, 0, 0);

        const sX = mouse.X;
        const sY = mouse.Y;
        const width = X - mouse.X;
        const height = Y - mouse.Y;
        ctx.strokeRect(sX, sY, width, height);

        // const increment_ration = 1.3 + scale - 1  + scale;
        const increment_ration = 0.3 + DPI + scale - 1;
        console.log(increment_ration);
        const YY =
          (rect.height * DPI) / increment_ration -
          (sY + (scale - 1)) / increment_ration -
          (height + DPI) / increment_ration;

        console.log(YY);
        setCoord({
          scale,
          X: sX / increment_ration,
          Y: YY, //603,
          W: 210,
          H: 80,
        });
      }
    },
    [isStart, scale]
  );

  useEffect(() => {
    if (pageData) setPageData(null);
  }, [scale]);

  const drawStop = useCallback(() => {
    setStart(false);
    setMouse({ X: 0, Y: 0 });
    // console.log(coord);

    _.forEach((file) => {
      if (file.isActive) {
        // console.log({ coord });
        postData(file.base64, coord);
      }
    });
  }, [coord, scale]);

  const onPageLoadSuccess = () => {
    setPageLoadedSuccessFull(true);
  };

  return (
    <Page
      scale={scale}
      width={pageWidth}
      canvasRef={canvasRef}
      pageNumber={pageNumber}
      onLoadSuccess={onPageLoadSuccess}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      devicePixelRatio={DPI}
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
  // const DPI = window.devicePixelRatio;
  // const DPI = 2;

  const X = parseInt(element.nativeEvent.offsetX * DPI);
  const Y = parseInt(element.nativeEvent.offsetY * DPI);

  // Mouse position
  // const X = parseInt((element.clientX - rect.left) * DPI);
  // const Y = parseInt((element.clientY - rect.top) * DPI);

  return { X, Y, rect };
};
// Preventing Defaults
const prevent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

// DPI maintain
const pdiValue = (value) => {
  // const pdi = window.devicePixelRatio;
  const pdi = 2;

  return pdi * value;
};

export default PdfPage;
