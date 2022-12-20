import { useState } from "react";

const useIntersectionObserver = (
  opt = { rootElement: null, margin: "10px", threshold: 1.0 }
) => {
  const [visible, setVisible] = useState(false);
  const options = {
    root: opt?.rootElement,
    rootMargin: opt?.margin,
    threshold: opt?.threshold,
  };

  const callbackFunction = (entries) => {
    console.log(entries);
  };

  const observerInstance = new IntersectionObserver(callbackFunction, options);

  const observer = (element) => observerInstance.observe(element);
  return [visible, observer];
};

export default useIntersectionObserver;
