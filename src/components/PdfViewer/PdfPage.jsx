import {useState, useCallback, useEffect, useRef} from "react";
import { usePdfViewerAction, pdfActions } from "./PdfActionHook";

import { Page } from "react-pdf";

const PdfPage = ({ pageNumber, ...restProps }) => {
  const _pageRef = useRef();
  const [pageLoadedSuccessFull, setPageLoadedSuccessFull] = useState(false);
  const [state, dispatch] = usePdfViewerAction();
  const { scale, pageWidth } = state;


  const onIntersectionChange = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch({
          action: pdfActions.CURRENT_PAGE,
          data: { currentPage: pageNumber },
        });
      }
    },
    [pageNumber, _pageRef.current, scale, pageLoadedSuccessFull]
  );
  // handle canvas click
  const handleCanvasClick = useCallback((e) => {
    console.log(e.target);
  });


  useEffect(() => {
    _pageRef.current &&
      new IntersectionObserver(onIntersectionChange, {
        threshold: 0.3,
        root: null,
        rootMargin: "0px",
      }).observe(_pageRef.current);
  }, [pageNumber, _pageRef.current, scale, pageLoadedSuccessFull]);

  
  return (
    <Page
      scale={scale}
      width={pageWidth}
      canvasRef={_pageRef}
      onClick={handleCanvasClick}
      pageNumber={pageNumber}
      onLoadSuccess={() => setPageLoadedSuccessFull(true)}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      {...restProps}
    />
  );
};

export default PdfPage;
