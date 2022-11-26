import { useState } from "react";

const UseMessage = (msg: string, delay: number, cb?: () => void): [setCB: () => void] => {
  const [message, setMessage] = useState("");

  const setCB = () => {
    setMessage(() => msg);
    setTimeout(() => {
      setMessage(() => msg);
      if (typeof cb === "function") {
        cb();
      }
    }, delay);
  };

  return [setCB];
};

export default UseMessage;
