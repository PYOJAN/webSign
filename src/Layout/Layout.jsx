import React from "react";
import Setting from "./Setting/Setting";
import Sidebar from "./Sidebar/Sidebar";
import Viewer from "./Viewer/Viewer";
import { PdfActionViewerProvider } from "../components/PdfViewer";

const Layout = () => {
  return (
    <PdfActionViewerProvider>
      {/* Sidebar setting */}
      <Sidebar />
      {/* PDF viewer */}
      <Viewer />
      {/* Setting */}
      <Setting />
    </PdfActionViewerProvider>
  );
};

export default Layout;
