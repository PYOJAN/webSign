import { configureStore } from "@reduxjs/toolkit";
import signatureReducer from "./signatureSlice";
import pkiApiReducer from "./pki.apiSlice";
import uiControlReducer from "./uiControl.slice";
import fileArrayReducer from "./fileSliceArray";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  signature: signatureReducer,
  pkiApi: pkiApiReducer,
  uiControl: uiControlReducer,
  fileArray: fileArrayReducer,
});

const persistConfig = {
  key: "webSign",
  storage,
  blacklist: ["fileArray"], // excluding files state from localStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  devTools: import.meta.env.MODE === "development", // reducer is disable if app in production mode.
  reducer: persistedReducer,
  middleware: [thunk],
});
