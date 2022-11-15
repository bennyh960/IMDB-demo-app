import { useState, useLayoutEffect } from "react";

const UseResize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => updateSize);
    updateSize(setSize);
    return () => window.removeEventListener("resize", () => updateSize);
  }, []);

  const [width, height] = size;
  return [width, height];
};

function updateSize(setSize: ([]) => void) {
  setSize([window.innerWidth, window.innerHeight]);
}

export default UseResize;
