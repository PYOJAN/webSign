import { configureStore } from "@reduxjs/toolkit";
import signatureReducer from "./signatureSlice";
import pkiApiReducer from "./pki.apiSlice";
import uiControlReducer from "./uiControl.slice";
import fileReducer from "./fileSlice";
import fileArrayReducer from "./fileSliceArray";

export const store = configureStore({
  devTools: import.meta.env.MODE === "development", // reducer is disable if app in production mode. 
  reducer: {
    signature: signatureReducer,
    pkiApi: pkiApiReducer,
    fileSlice: fileReducer,
    uiControl: uiControlReducer,
    fileArray: fileArrayReducer
  },
});
