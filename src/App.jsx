import { useRef, useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { Toaster } from "react-hot-toast";

const App = () => {
  const rootBody = useRef();
  const [body, setBody] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  // Getting main window info for toaster
  useEffect(() => {
    // Preventing context menu on mouse right click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    const { width, x, y } = rootBody.current.getBoundingClientRect();
    const OFFSET_SPACE = 20;

    const RIGHT = (x + width - window.innerWidth) * -1;
    setBody({
      ...body,
      left: x + OFFSET_SPACE,
      top: y + OFFSET_SPACE,
      right: RIGHT + OFFSET_SPACE,
    });
  }, []);

  // dark mode enable
  useEffect(() => {
    const HTML = document.querySelector("html");
    HTML.dataset.mode = "dark"; // dark
  }, []);

  return (
    <div ref={rootBody} className="main-body">
      <Toaster
        containerStyle={{
          left: body.left,
          right: body.right,
        }}
      />
      <Layout />
    </div>
  );
};

export default App;
