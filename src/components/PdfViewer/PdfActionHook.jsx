import { createContext, useContext, useReducer, useState } from "react";

const ActionContext = createContext();

//Initial State and Actions
const initialState = {
  scale: 1,
  totalPages: 0,
  rotation: 0,
  currentPage: 1,
  pageWidth: 600,
};

export const pdfActions = {
  // Scale control of document
  ZOOM_IN: "ZOOM_IN",
  ZOOM_OUT: "ZOOM_OUT",
  // Current viewer page
  CURRENT_PAGE: "CURRENT_PAGE",
  TOTAL_PAGE: "TOTAL_PAGE",
  PAGE_WIDTH: "PAGE_WIDTH",

  // Rotation control of document
  ROTATE_CLOCKWISE: "ROTATE_CLOCKWISE",
  ROTATE_ANTI_CLOCKWISE: "ROTATE_ANTI_CLOCKWISE",
};

const SCALE_RATIO = 0.05;

// custom reducer
const reducer = (state, actionTrigger) => {
  const { action, data } = actionTrigger;

  // let updateData;
  switch (action) {
    case pdfActions.ZOOM_IN:
      return {
        ...state,
        scale: state.scale + SCALE_RATIO,
      };
    case pdfActions.ZOOM_OUT:
      return {
        ...state,
        scale: state.scale - SCALE_RATIO,
      };
    case pdfActions.TOTAL_PAGE:
      return {
        ...state,
        totalPages: data.pages,
      };
    case pdfActions.PAGE_WIDTH:
      return {
        ...state,
        pageWidth: data.width,
      };
    case pdfActions.CURRENT_PAGE:
      return {
        ...state,
        currentPage: data.currentPage,
      };
    default:
      return state;
  }
};

// Component
const PdfActionViewerProvider = ({ children }) => {
  return (
    <ActionContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ActionContext.Provider>
  );
};

// =========================================================

export const useIntersectionObserver = (
  opt = { rootElement: null, margin: "10px", threshold: 1.0 }
) => {
  const [visible, setVisible] = useState(false);
  const options = {
    root: opt?.rootElement,
    rootMargin: opt?.margin,
    threshold: opt?.threshold,
  };

  const callbackFunction = (entries) => {
    entries.forEach(entry => {
      setVisible(entry.target.dataset.pageNumber)
    })
  };

  const observerInstance = new IntersectionObserver(callbackFunction, options);

  // const observer = (element) => observerInstance.observe(element);
  return [visible, observerInstance];
};

// =========================================================

export const usePdfViewerAction = () => useContext(ActionContext);

export default PdfActionViewerProvider;
