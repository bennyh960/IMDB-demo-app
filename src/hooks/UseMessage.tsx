import React, { useState, useEffect } from "react";

const UseMessage = (
  msg: string,
  delay: number
): [message: string, setMessage: React.Dispatch<React.SetStateAction<string>>] => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(() => msg);
    setTimeout(() => {
      setMessage(() => msg);
    }, delay);
  });

  return [message, setMessage];
};

export default UseMessage;
