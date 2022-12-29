import { createContext, useContext, useReducer } from "react";
import { reducer } from './actionReducer'

const ActionContext = createContext();

//Initial State and Actions
export const pdfViewerState = [];

// Component
const PdfActionViewerProvider = ({ children }) => {
  return (
    <ActionContext.Provider value={useReducer(reducer, pdfViewerState)}>
      {children}
    </ActionContext.Provider>
  );
};

export const usePdfViewerAction = () => useContext(ActionContext);

export default PdfActionViewerProvider;
