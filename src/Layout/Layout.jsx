import React from "react";
import Setting from "./Setting/Setting";
import Sidebar from "./Sidebar/Sidebar";
import Viewer from "./Viewer/Viewer";


const Layout = () => {
  return (
    <>
      {/* Sidebar setting */}
      <Sidebar />
      {/* PDF viewer */}
      <Viewer />
      {/* Setting */}
      <Setting />
    </>
  );
};

export default Layout;
